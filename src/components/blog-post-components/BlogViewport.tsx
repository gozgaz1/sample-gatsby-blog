import { dimensions } from '@/utils/dimensions';
import React, {
  MutableRefObject,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react';
import styled from 'styled-components';
import { Cursor } from '../CursorComponent';
import { motion } from 'framer-motion';
import { BlogCurtain } from './BlogCurtain';

const Container = styled.div`
  font-family: Classified;
  color: rgba(0, 0, 0, 1);
  transform-style: preserve-3d;
  perspective: 1px;
  position: fixed;
  overflow: hidden;
`;
const TypewriterKeyframe = `
  animation: typewriter 2s steps(30) 1s 1 normal both, blinkTextCursor 800ms steps(30) infinite normal;
  @keyframes typewriter{
      from {width: 0;}
      to {width: 100%;}
  }
  @keyframes blinkTextCursor{
      from{border-right-color: inherit;}
      to{border-right-color: transparent;}
  }
`;
const TitleHeader = styled.h2`
  position: relative;
  padding: 0;
  top: 50%;
  margin: 2vh 0;
  text-align: left;
  font-size: 8vw;
  font-family: StyledHeader;
  border-right: 4px solid rgba(255, 255, 255, 1);
  color: inherit;
  white-space: nowrap;
  word-spacing: 1px;
  overflow: hidden;
  transform: translateY(-50%);
  cursor: default;
  ${TypewriterKeyframe}
`;
const Viewport = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 0;
  z-index: 1000;
  background-color: var(--background-color);
  color: var(--primary-color);
  font-family: Primary;
  pointer-events: none; // allows click-through
  @media ${dimensions.mobileS} {
  }
  @media ${dimensions.tablet} {
  }
  @media ${dimensions.laptop} {
  }
  @media ${dimensions.desktop} {
  }
`;
const ProgressBar = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: rgba(220, 0, 0, 1);
  transform-origin: 0%;
  z-index: 100;
`;
// Types

type LayoutProps = {
  children: ReactNode;
};

// Default Export
export default function BlogViewport({ children }: LayoutProps) {
  const [scrollYProgress, updateScrollYProgress] = useState(0);
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  // const screenRef = useRef() as MutableRefObject<HTMLDivElement>;
  const transformRef = useRef(`translate3d(0, 0, 0)`);
  const offsetRef = useRef(0);
  const requestRef = useRef(0);

  const onWheel = (e: WheelEvent) => {
    const fullHeight = containerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;
    const maxOffset = Math.max(fullHeight - viewportHeight, 0);
    const scrollValue = (20 * e.deltaY) / 100;
    const newPos = Math.max(offsetRef.current + scrollValue, 0);
    offsetRef.current = Math.min(newPos, maxOffset);
    transformRef.current = `translate3d(0, ${offsetRef.current * -1}px, 0)`;
    updateScrollYProgress(Math.max(offsetRef.current / maxOffset, 0));
  };

  const animateTransform = () => {
    if (containerRef.current !== null) {
      containerRef.current.style.transform = transformRef.current;
      containerRef.current.style.transition = `transform 1s ease, color 1s ease-in, background-color 1s ease-in`; // emulate lerping
      // screenRef.current.style.transition = `background-color 1s ease-in`;

      if (offsetRef.current >= containerRef.current.offsetHeight / 3) {
        // screenRef.current.style.backgroundColor = `rgba(0, 0, 0, 0.9)`;
        containerRef.current.style.backgroundColor = `rgba(0, 0, 0, 0.9)`;
        containerRef.current.style.color = `rgba(225, 225, 225, 1)`;
      } else {
        // screenRef.current.style.backgroundColor = `rgba(225, 225, 225, 1)`;
        containerRef.current.style.backgroundColor = `rgba(225, 225, 225, 1)`;
        containerRef.current.style.color = `rgba(0, 0, 0, 1)`;
      }
    }
    requestRef.current = window.requestAnimationFrame(animateTransform);
  };

  useEffect(() => {
    window.addEventListener(`wheel`, onWheel);
    animateTransform();
    return () => {
      window.removeEventListener(`wheel`, onWheel);
      window.cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <React.Fragment>
      <Viewport>
        <ProgressBar animate={{ scaleX: scrollYProgress }} />
        <Cursor />
      </Viewport>
      <BlogCurtain />
      <Container ref={containerRef}>{children}</Container>
    </React.Fragment>
  );
}

export { TitleHeader };

/*
<AnimatePresence mode="wait">
<Screen ref={screenRef} />
</AnimatePresence>
*/
