import type { GatsbySSR } from 'gatsby';

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <link
      rel="preload"
      href="./Classified.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="classifiedFont"
    />,
    <link
      rel="preload"
      href="./StyledHeader.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="styledHeaderFont"
    />,
    <link
      rel="preload"
      href="./Typewriter.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="typewriterFont"
    />,
  ]);
};
