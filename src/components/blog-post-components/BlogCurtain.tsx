import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ScreenCurtainLeft = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 49.9vw;
  height: 100vh;
  transform-origin: 0 50%;
  background-color: rgb(255, 255, 255);
  border-right: 0.1vw solid rgb(0, 0, 0);
  z-index: 10;
`;
const ScreenCurtainRight = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 49.9vw;
  height: 100vh;
  transform-origin: 100% 50%;
  background-color: rgb(255, 255, 255);
  border-left: 0.1vw solid rgb(0, 0, 0);
  z-index: 10;
`;
const curtainVariants = {
  closed: {
    scaleX: 1,
  },
  open: {
    scaleX: 0,
    border: `hidden`,
  },
};
const curtainTransition = {
  delay: 1,
  duration: 0.8,
  ease: [0.14, 0.62, 0.23, 0.98],
};

const BlogCurtain = () => {
  return (
    <React.Fragment>
      <AnimatePresence>
        <ScreenCurtainLeft
          variants={curtainVariants}
          transition={curtainTransition}
          initial="closed"
          animate="open"
          exit="closed"
        />
        <ScreenCurtainRight
          variants={curtainVariants}
          transition={curtainTransition}
          initial="closed"
          animate="open"
          exit="closed"
        />
      </AnimatePresence>
    </React.Fragment>
  );
};

export { BlogCurtain };
