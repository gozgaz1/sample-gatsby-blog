import { MutableRefObject, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CircleCursor = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(70%, -80%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  width: 20px;
  height: 20px;
  background-color: rgba(225, 0, 0, 0.8);
  z-index: 205;

  @media screen and (width: 800px) {
    display: none;
  }
`;
const Cursor = () => {
  const delayFollow = 6;
  const circle = useRef() as MutableRefObject<HTMLDivElement>;
  const endX = useRef(0);
  const endY = useRef(0);
  const _x = useRef(0);
  const _y = useRef(0);
  const requestRef = useRef(0);
  const cursorVisible = useRef(false);

  const mouseEnterEvent = (): void => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const mouseLeaveEvent = (): void => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const mouseMoveEvent = (e: MouseEvent): void => {
    cursorVisible.current = true;
    toggleCursorVisibility();
    endX.current = e.pageX;
    endY.current = e.pageY;
  };

  const animateCircle = (): void => {
    _x.current += (endX.current - _x.current) / delayFollow;
    _y.current += (endY.current - _y.current) / delayFollow;

    circle.current.style.top = _y.current + `px`;
    circle.current.style.left = _x.current + `px`;
    requestRef.current = window.requestAnimationFrame(animateCircle);
  };

  const toggleCursorVisibility = (): void => {
    if (cursorVisible.current && window.innerWidth > 800) {
      circle.current.style.opacity = `1`;
    } else {
      circle.current.style.opacity = `0`;
    }
  };
  useEffect(() => {
    document.addEventListener(`mousemove`, mouseMoveEvent);
    document.addEventListener(`mouseenter`, mouseEnterEvent);
    document.addEventListener(`mouseleave`, mouseLeaveEvent);
    animateCircle();
    return () => {
      document.removeEventListener(`mousemove`, mouseMoveEvent);
      document.removeEventListener(`mouseenter`, mouseEnterEvent);
      document.removeEventListener(`mouseleave`, mouseLeaveEvent);
      window.cancelAnimationFrame(requestRef.current);
    };
  }, []);
  return <CircleCursor ref={circle} />;
};

export { Cursor };
