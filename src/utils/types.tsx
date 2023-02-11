type NodeProps = {
  blogHeader: string;
  blogBody: {
    raw: string;
  };
  blogPrimaryPhoto: {
    gatsbyImageData: any;
  };
  blogPhotoCollection: Array<any>;
  isClassified: boolean;
  id: string;
  slugs: string;
};

type ImageCollections = {
  blogPhotoCollection: Array<any>;
  blogPrimaryPhoto: {
    gatsbyImageData: any;
  };
};

type DataProps = {
  allContentfulBlogContent: {
    nodes: Array<NodeProps>;
  };
};

type BlogHeader = {
  allContentfulBlogContent: {
    nodes: {
      slug: string;
      blogHeader: string;
    };
  };
};

type PageContext = {
  pageContext: {
    contents: {
      blogBody: {
        raw: string;
      };
      blogHeader: string;
      isClassified: boolean;
    };
    slug: string;
    previousPostSlug: string;
    nextPostSlug: string;
  };
  data: {
    allContentfulBlogContent: {
      nodes: Array<NodeProps>;
    };
  };
};

export { NodeProps, DataProps, PageContext, BlogHeader, ImageCollections };
