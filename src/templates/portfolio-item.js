import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import Seo from "../components/Seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import * as styles from "../styles/portfolio-item.module.css";

const PortfolioItemPage = ({ data }) => {
  const item = data.contentfulPortfolioItem;

  const hasHero = item.hasHeroImage;
  const heroImage = hasHero ? item.featuredImage?.[0] : null;
  const galleryImages = hasHero
    ? item.featuredImage?.slice(1)
    : item.featuredImage;

  return (
    <Layout>
      <article className={styles.pageContent}>
        <h1 className={styles.title}>{item.title}</h1>

        {heroImage && (
          <GatsbyImage
            className={styles.heroImage}
            image={getImage(heroImage)}
            alt={heroImage.title || item.title}
          />
        )}

        {item.body && (
          <div className={styles.body}>
            {documentToReactComponents(JSON.parse(item.body.raw))}
          </div>
        )}

        {item.githubUrl && (
          <div className={styles.githubLinkWrapper}>
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              View on GitHub
            </a>
          </div>
        )}

        {galleryImages && galleryImages.length > 0 && (
          <div className={styles.gallery}>
            {galleryImages.map((image, index) => (
              <GatsbyImage
                key={index}
                className={styles.galleryItem}
                image={getImage(image)}
                alt={image.title || item.title}
              />
            ))}
          </div>
        )}
      </article>
    </Layout>
  );
};

export const query = graphql`
  query PortfolioItemBySlug($slug: String!) {
    contentfulPortfolioItem(slug: { eq: $slug }) {
      title
      hasHeroImage
      body {
        raw
      }
      githubUrl
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
  <Seo title={data.contentfulPortfolioItem.title} />
);

export default PortfolioItemPage;
