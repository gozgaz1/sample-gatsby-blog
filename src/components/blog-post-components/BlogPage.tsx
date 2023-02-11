import React, { useRef } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import '../../static/fonts/fonts.css';
import { MainLink } from './BlogFolder';
import BlogViewport, { TitleHeader } from './BlogViewport';
import type { PageContext } from '@/utils/types';
import { BackgroundParallax } from './BackgroundParallax';

const Contents = styled(motion.div)`
  padding: 10vh 10vw;
`;
const ClassifiedHeader = styled(motion.div)`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 12vh;
  right: 2vw;
  transform: rotate(-10deg);
  font-size: 10vw;
  font-family: Classified;
  text-align: center;
  cursor: default;
  color: rgba(220, 0, 0, 1);
  text-spacing: 3px;
  z-index: 3;
`;
const TextParagraph = styled(motion.p)`
  margin: 0 0 2rem;
  padding: 4vh 4vw;
  font-size: 3vh;
  font-family: Typewriter;
  cursor: default;
  color: inherit;
`;
const PrevPage = styled(Link)`
  position: fixed;
  bottom: 3vh;
  left: 1vw;
  font-family: StyledHeader;
  font-size: 5vh;
  color: rgba(225, 225, 225, 1);
`;
const NextPage = styled(Link)`
  position: fixed;
  bottom: 3vh;
  right: 1vw;
  font-size: 5vh;
  font-family: StyledHeader;
  color: rgba(225, 225, 225, 1);
`;
const StringContain = styled.div`
  display: inline-block; // this allows the string to be lengthed correctly
  height: auto;
  width: auto;
  text-align: center;
  line-height: auto;
`;
const Letter = styled(motion.span)`
  display: inline-block;
  margin: 0;
  padding: 0;
`;
const paragraphVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 3,
    },
  },
};
const wordVariants = {
  hidden: {},
  visible: {},
};
const letterVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

export default function BlogPage(blogData: PageContext) {
  // this is a page, belongs ELSWHERE other than `components`
  const classifiedText = `[CLASSIFIED]`;

  const post = blogData.data.allContentfulBlogContent.nodes[0];
  const prevPostSlug = blogData.pageContext.previousPostSlug;
  const nextPostSlug = blogData.pageContext.nextPostSlug;
  const blogBody = JSON.parse(post.blogBody?.raw).content.map((c: any) => {
    return [...c.content];
  });
  const images = {
    blogPhotoCollection: post.blogPhotoCollection,
    blogPrimaryPhoto: post.blogPrimaryPhoto,
  };

  const blogHeader = post.blogHeader;
  const isClassified = post.isClassified;
  const pageMoveRef = useRef(null);

  return (
    <React.Fragment>
      <BlogViewport>
        <MainLink />
        {isClassified && (
          <ClassifiedHeader
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delayChildren: 1,
              staggerChildren: 0.1,
            }}
          >
            {classifiedText.split(``).map((c: string, k: number) => {
              return (
                <Letter key={k} variants={letterVariants}>
                  {c}
                </Letter>
              );
            })}
          </ClassifiedHeader>
        )}
        {nextPostSlug && (
          <NextPage to={`/` + nextPostSlug} ref={pageMoveRef}>
            &NEXT
          </NextPage>
        )}
        {prevPostSlug && (
          <PrevPage to={`/` + prevPostSlug} ref={pageMoveRef}>
            &PREV
          </PrevPage>
        )}
        <Contents>
          <StringContain>
            <TitleHeader>{blogHeader}</TitleHeader>
          </StringContain>
          {blogBody.length > 0 &&
            blogBody.map((para: Array<any>, pk: number) => {
              return (
                <TextParagraph
                  key={pk}
                  variants={paragraphVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {para[0].value}
                </TextParagraph>
              );
            })}
        </Contents>
        <BackgroundParallax data={images} />
      </BlogViewport>
    </React.Fragment>
  );
}

export const query = graphql`
  query BlogHeaderNodes($slug: String) {
    allContentfulBlogContent(filter: { slugs: { eq: $slug } }) {
      nodes {
        blogHeader
        blogBody {
          raw
        }
        blogPhotoCollection {
          gatsbyImageData
        }
        blogPrimaryPhoto {
          gatsbyImageData
        }
        id
        isClassified
        slugs
      }
    }
  }
`;
