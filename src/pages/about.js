import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as styles from "../styles/about.module.css";

const AboutPage = ({ data }) => {
  const page = data.contentfulPage;

  return (
    <Layout>
      <section className={styles.about}>
        <h1 className={styles.title}>{page.title}</h1>

        <div className={styles.grid}>
          {page.featuredImage && (
            <div className={styles.imageWrapper}>
              <GatsbyImage
                image={getImage(page.featuredImage)}
                alt={page.featuredImage.title || page.title}
                className={styles.image}
              />
            </div>
          )}

          <div className={styles.content}>
            {documentToReactComponents(JSON.parse(page.body.raw))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query AboutPageQuery {
    contentfulPage(slug: { eq: "about-me" }) {
      title
      body {
        raw
      }
      featuredImage {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: BLURRED
          formats: [AUTO, WEBP]
        )
        title
      }
    }
  }
`;

export const Head = ({ data }) => (
  <title>{data.contentfulPage.title}</title>
);

export default AboutPage;
