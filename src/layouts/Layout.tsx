import Seo from '@/components/Seo';
import React, { ReactNode } from 'react';
import styled from 'styled-components';
import '@/static/styles/normalize.css';
import Raleway from '@/static/fonts/Raleway-Regular.ttf';
import Italiana from '@/static/fonts/Italiana-Regular.ttf';

// Styled Components
const HeaderLogo = styled.div``;
const FooterLogo = styled.div``;
const FontStyle = styled.div`
  @font-face {
    font-family: 'Primary';
    font-style: normal;
    font-display: auto;
    font-weight: 500;
    src: url(${Raleway}) format('truetype');
  }
  @font-face {
    font-family: 'Secondary';
    font-style: normal;
    font-weight: 500;
    font-display: auto;
    src: url(${Italiana}) format('truetype');
  }
  body {
    --primary-color: black;
    --secondary-color: red;
    --background-color: white;
  }
`;

// Types
type LayoutProps = {
  children: ReactNode;
};

// Default Export
export default function Layout({ children }: LayoutProps) {
  return (
    <React.Fragment>
      <Seo />
      <FontStyle />
      <HeaderLogo />
      {children}
      <FooterLogo />
    </React.Fragment>
  );
}
