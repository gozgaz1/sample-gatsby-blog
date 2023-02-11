import React, { useRef } from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';
import type { ImageCollections } from '@/utils/types';

const BackgroundWrapper = styled(motion.div)`
  margin: 0;
  height: 100vh;
  position: absolute;
  z-index: -1;
  transform: translateZ(-1px) scale(1.5);
`;
const ScatteredImg = styled(motion.div)`
  position: absolute;
  height: 20vw;
  width: 15vw;
  cursor: pointer;
`;
const PrimaryImg = styled.div`
  position: absolute:
  top: 10vh;
  left: 40vw;
  overflow: hidden;
`;
const scatteredImgVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};
const backgroundWrapperVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 0.6,
    transition: {
      duration: 2,
      delay: 0.2,
      staggerChildren: 1.5,
    },
  },
};

function randomNumber(min: number, max: number, base: number): number {
  const sampling = Math.random() * (max - min) + min;
  return sampling + base;
}

const BackgroundParallax = ({ data }: ImageCollections) => {
  const blogPhotoCollection = data.blogPhotoCollection;
  const blogPrimaryPhoto = data.blogPrimaryPhoto;

  const scatteredImgRef = useRef(
    blogPhotoCollection
      ? blogPhotoCollection.map(() => {
          return {
            top: `${randomNumber(-80, 120, 70)}vh`,
            left: `${randomNumber(-50, 80, 20)}vw`,
            transform: `translateZ(-${randomNumber(-0.2, 1.3, 3)}px) scale(5)`,
          };
        })
      : [],
  );

  return (
    <React.Fragment>
      <BackgroundWrapper
        variants={backgroundWrapperVariants}
        initial="hidden"
        animate="visible"
      >
        {blogPhotoCollection &&
          blogPhotoCollection.length > 0 &&
          blogPhotoCollection.map((i: any, k: number) => {
            return (
              <ScatteredImg
                variants={scatteredImgVariants}
                style={scatteredImgRef.current[k]}
                key={k}
              >
                <GatsbyImage
                  image={i.gatsbyImageData}
                  alt="psyop-image"
                  key={k}
                />
              </ScatteredImg>
            );
          })}
        <PrimaryImg>
          <GatsbyImage
            image={blogPrimaryPhoto.gatsbyImageData}
            alt="psyop-primary-image"
          />
        </PrimaryImg>
      </BackgroundWrapper>
    </React.Fragment>
  );
};

export { BackgroundParallax };
