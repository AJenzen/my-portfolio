import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  container,
  siteHeader,
  siteFooter,
  siteNav,
  navLink,
  navLinkActive,
  footerLinks,
} from "../styles/layout.module.css";

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      allContentfulNavigationItem(sort: { order: ASC }) {
        nodes {
          label
          slug
        }
      }

      contentfulSiteSettings {
        footerText
        githubUrl
        linkedinUrl
        email

        githubIcon {
          gatsbyImageData(placeholder: NONE)
          title
        }

        linkedinIcon {
          gatsbyImageData(placeholder: NONE)
          title
        }

        emailIcon {
          gatsbyImageData(placeholder: NONE)
          title
        }
      }
    }
  `);

  const navItems = data.allContentfulNavigationItem.nodes;
  const settings = data.contentfulSiteSettings;
  const location = useLocation();

  return (
    <div className={container}>
      <header className={siteHeader}>
        <h1>
          <Link to="/">The Portfolio</Link>
        </h1>

        <nav className={siteNav}>
          {navItems.map((item) => {
            const slugWithSlash = item.slug.endsWith("/")
              ? item.slug
              : `${item.slug}/`;

            const isActive = location.pathname === slugWithSlash;

            return (
              <Link
                key={item.slug}
                to={slugWithSlash}
                className={`${navLink} ${isActive ? navLinkActive : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main>{children}</main>

      <footer className={siteFooter}>
        {settings?.footerText && <p>{settings.footerText}</p>}

        <div className={footerLinks}>
          {settings?.githubUrl && settings?.githubIcon && (
            <a
              href={settings.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GatsbyImage
                image={getImage(settings.githubIcon)}
                alt={settings.githubIcon.title || "GitHub"}
              />
            </a>
          )}

          {settings?.linkedinUrl && settings?.linkedinIcon && (
            <a
              href={settings.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <GatsbyImage
                image={getImage(settings.linkedinIcon)}
                alt={settings.linkedinIcon.title || "LinkedIn"}
              />
            </a>
          )}

          {settings?.email && settings?.emailIcon && (
            <a href={`mailto:${settings.email}`} aria-label="Email">
              <GatsbyImage
                image={getImage(settings.emailIcon)}
                alt={settings.emailIcon.title || "Email"}
              />
            </a>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
