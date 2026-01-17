import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

const Seo = ({ title }) => {
  const data = useStaticQuery(graphql`
    query {
      contentfulSiteSettings {
        defaultSeoDescription {
          defaultSeoDescription
        }
      }
    }
  `);

  const description = data.contentfulSiteSettings?.defaultSeoDescription?.defaultSeoDescription ||
    "Frontend developer portfolio built with Gatsby and Contentful";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
};

export default Seo;
