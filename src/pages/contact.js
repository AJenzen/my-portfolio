import * as React from "react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "../components/layout";
import Seo from "../components/Seo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as styles from "../styles/contact.module.css";

const ContactPage = ({ data }) => {
  const page = data.contentfulPage;
  const image = getImage(page.featuredImage);

  return (
    <Layout>
      <section className={styles.contactPage}>
        <h1 className={styles.title}>{page.title}</h1>

        <div className={styles.contactContent}>
          <div className={styles.text}>
            {documentToReactComponents(JSON.parse(page.body.raw))}
          </div>

          {image && (
            <div className={styles.imageWrapper}>
              <GatsbyImage image={image} alt={page.featuredImage.title} />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ContactPageQuery {
    contentfulPage(slug: { eq: "contact" }) {
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
  <Seo title={data.contentfulPage.title} />
);

export default ContactPage;
