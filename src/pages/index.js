import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import * as styles from "../styles/home.module.css";

const IndexPage = ({ data }) => {
  const page = data.contentfulPage;

  return (
    <Layout>
      <section className={styles.hero}>
        {page.featuredImage && (
          <div className={styles.imageWrapper}>
            <GatsbyImage
              image={getImage(page.featuredImage)}
              alt={page.featuredImage.title || page.title}
            />
          </div>
        )}
        <div className={styles.text}>
          <h1 className={styles.title}>{page.title}</h1>
          <div className={styles.description}>
            {documentToReactComponents(JSON.parse(page.body.raw))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query HomePageQuery {
    contentfulPage(pageType: { eq: "home" }) {
      title
      body {
        raw
      }
      featuredImage {
        gatsbyImageData(
          layout: FULL_WIDTH
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
        title
      }
    }
  }
`;

export const Head = ({ data }) => {
  return <Seo title={data.contentfulPage.title} />;
};

export default IndexPage;
