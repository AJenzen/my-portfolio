import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
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

export const Head = ({ data }) => (
  <>
    <title>{data.contentfulPage.title}</title>
    <meta
      name="description"
      content="Frontend developer portfolio built with Gatsby and Contentful"
    />
  </>
);

export default IndexPage;
