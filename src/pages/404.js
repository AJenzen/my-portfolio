import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/Seo";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as styles from "../styles/404.module.css";

const NotFoundPage = ({ data }) => {
  const page = data.contentfulPage;

  return (
    <Layout>
      <section className={styles.notFound}>
        <h1 className={styles.title}>{page.title}</h1>

        <div className={styles.text}>
          {documentToReactComponents(JSON.parse(page.body.raw))}
        </div>

        <Link to="/" className={styles.button}>
          Back to Home
        </Link>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query NotFoundPageQuery {
    contentfulPage(slug: { eq: "404" }) {
      title
      body {
        raw
      }
    }
  }
`;

export const Head = ({ data }) => (
  <Seo title={data.contentfulPage.title} />
);

export default NotFoundPage;
