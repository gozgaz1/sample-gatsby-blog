import { graphql, useStaticQuery } from 'gatsby';
import Helmet from 'react-helmet';

// Styled Components

// Types
type PropertyMetaObj = {
  property: string;
  content: string;
};
type NameMetaObj = {
  name: string;
  content: string;
};
type Meta = ConcatArray<PropertyMetaObj | NameMetaObj>;
type SeoProps = {
  title?: string;
  description?: string;
  lang?: string;
  meta?: Meta;
};

// Default Export
export default function Seo({
  title,
  description,
  lang = `en`,
  meta = [],
}: SeoProps) {
  const { site } = useStaticQuery(
    graphql`
      query MySite {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
          }
        }
      }
    `,
  );
  const keywords = site.siteMetadata.keywords;
  const metaDescription = description || site.siteMetadata.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          name: `keywords`,
          content: keywords,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata?.author || ``,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  );
}
