import Layout from '@/layouts/Layout';
import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { BlogIndex } from '@/components/blog-post-components/BlogIndex';
import BlogViewport from '@/components/blog-post-components/BlogViewport';
import { BlogHeader } from '@/utils/types';

export default function IndexPage({ data }: PageProps<BlogHeader>) {
  const isBrowser = typeof window !== `undefined`;
  const blogData = data.allContentfulBlogContent.nodes;
  return isBrowser ? (
    <React.Fragment>
      <Layout>
        <BlogViewport>
          <BlogIndex blogData={blogData} />
        </BlogViewport>
      </Layout>
    </React.Fragment>
  ) : null;
}

export const query = graphql`
  query AllBlogHeaderContent {
    allContentfulBlogContent {
      nodes {
        blogHeader
        slugs
      }
    }
  }
`;
