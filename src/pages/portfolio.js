import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import * as styles from "../styles/portfolio.module.css";

const PortfolioPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulPortfolioItem {
        nodes {
          title
          slug
          featuredImage {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              width: 600
            )
            title
          }
        }
      }
    }
  `);

  const items = data.allContentfulPortfolioItem.nodes;

  return (
    <Layout>
      <section className={styles.hero}>
        <h1 className={styles.pageTitle}>My Portfolio</h1>
        <div className={styles.grid}>
          {items.map((item) => (
            <Link
              to={`/portfolio/${item.slug}`}
              key={item.slug}
              className={styles.card}
            >
              {item.featuredImage?.[0] && (
                <GatsbyImage
                  image={getImage(item.featuredImage[0])}
                  alt={item.featuredImage[0].title || item.title}
                  className={styles.cardImage}
                />
              )}
              <h2 className={styles.cardTitle}>{item.title}</h2>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export const Head = () => <Seo title="Portfolio" />;

export default PortfolioPage;
