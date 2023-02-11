import styled from 'styled-components';
import { Link } from 'gatsby';
import { motion } from 'framer-motion';
import FolderIcon from '../../images/folderIcon.png';
import { TitleHeader } from './BlogViewport';
import { NodeProps } from '@/utils/types';

const IndexContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Centered = styled(motion.div)`
  position: absolute;
  height: 30%;
  margin-right: auto;
  display: inline-block;
  bottom: 0;
  text-align: center;
  line-height: auto;
`;
const FolderSection = styled.div`
  position: absolute;
  top: 0;
  height: 70%;
`;
const FolderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: repeat(5, auto);
  align-content: center;
  top: 0;
  width: 100%;
  margin: 0;
`;
const PageFolder = styled(motion.div)`
  background-image: url(${FolderIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: auto;
  height: 10vh;
  width: 10vh;
  opacity: 0.8;
  cursor: pointer;
  color: white;
  top: 40%;
`;
const LinkContainer = styled(motion.div)`
  position: relative;
  display: inline-block;
  margin: 2vh 0;
`;
const PageLink = styled(Link)`
  color: inherit;
`;
const FolderName = styled(motion.p)`
  font-family: StyledHeader;
  font-size: 3vw;
  text-align: center;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 40%;
  transform-origin: 0 50%;
  width: 100%;
`;
const Letter = styled(motion.span)`
  cursor: default;
`;

const centeredVariants = {
  hidden: {},
  visible: {
    color: `rgba(0, 0, 0, 0.6)`,
    transition: {
      duration: 4,
      ease: `easeInOut`,
    },
  },
};
const pageVariants = {
  rest: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  hover: (i = 1) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1 * i,
    },
  }),
};
const folderVariants = {
  rest: {
    opacity: 1,
  },
  hover: {
    opacity: 0.3,
    scale: 1.2,
  },
};
const letterVariants = {
  rest: {
    color: `rgba(255, 255, 255, 0)`,
  },
  hover: {
    color: `rgba(0, 0, 0, 1)`,
    scaleX: 1,
  },
};
const letterTransition = {
  type: `type`,
  stiffness: 100,
};
const BlogIndex = ({ blogData }: any) => {
  return (
    <IndexContainer>
      <Centered variants={centeredVariants} initial="hidden" animate="visible">
        <TitleHeader>WELCOME</TitleHeader>
      </Centered>
      <FolderSection>
        <FolderContainer>
          {blogData?.map((node: NodeProps) => (
            <LinkContainer
              key={node.slugs}
              variants={pageVariants}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <FolderName>
                {node.blogHeader &&
                  node.blogHeader.split(``).map((w: string, k: number) => {
                    return (
                      <Letter
                        key={k}
                        variants={letterVariants}
                        transition={letterTransition}
                      >
                        {w}
                      </Letter>
                    );
                  })}
              </FolderName>
              <PageLink to={`/${node.slugs}`}>
                <PageFolder variants={folderVariants} />
              </PageLink>
            </LinkContainer>
          ))}
        </FolderContainer>
      </FolderSection>
    </IndexContainer>
  );
};

export { BlogIndex };
