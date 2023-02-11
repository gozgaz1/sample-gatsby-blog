import Layout from '@/layouts/Layout';
import React from 'react';

export default function TemplatePage() {
  const isBrowser = typeof window !== `undefined`;

  return isBrowser ? (
    <React.Fragment>
      <Layout>
        <>
          This is a default page. Be sure to wrap everything inside the Layout
          object!
        </>
      </Layout>
    </React.Fragment>
  ) : null;
}
