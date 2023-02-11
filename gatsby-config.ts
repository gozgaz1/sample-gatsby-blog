import type { GatsbyConfig } from 'gatsby';
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  siteMetadata: {
    title: `elon-psyop`,
    description: `demo blog site B`,
    author: `Trey`,
    siteUrl: `https://www.yourdomain.tld`,
    keywords: [`Elon`, `Psyop`, `Fame`, `Clout`],
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        spaceId: process.env.CONTENTFUL_SPACE_ID,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
  ],
  jsxRuntime: `automatic`,
};

export default config;
