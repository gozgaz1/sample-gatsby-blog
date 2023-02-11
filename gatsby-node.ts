import type { GatsbyNode } from 'gatsby';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import path from 'path';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.glb/,
          type: `asset/resource`,
        },
      ],
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
    },
  });
};

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define a template for blog post
  // eslint-disable-next-line prettier/prettier
  const blogPost = path.resolve(`./src/components/blog-post-components/BlogPage.tsx`);

  const result = await graphql(`
    query BlogContent {
      allContentfulBlogContent {
        nodes {
          slugs
          blogHeader
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors,
    );
    return;
  }

  const posts = result.data.allContentfulBlogContent.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index: number) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slugs;
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slugs;

      createPage({
        path: `/${post.slugs}/`,
        component: blogPost,
        context: {
          contents: post.blogHeader,
          slug: post.slugs,
          previousPostSlug,
          nextPostSlug,
        },
        ownerNodeId: post.id,
      });
    });
  }
};
