import * as React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import { useLocation } from "@reach/router";
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
    query {
      allContentfulNavigationItem(sort: { order: ASC }) {
        nodes {
          label
          slug
        }
      }
      contentfulSiteSettings {
        siteTitle
        footerText
        githubUrl
        linkedinUrl
        email
      }
    }
  `);

  const navItems = data.allContentfulNavigationItem.nodes;
  const settings = data.contentfulSiteSettings || {};
  const location = useLocation();

  return (
    <div className={container}>
      <header className={siteHeader}>
        <h1>
          <Link to="/"> The Portfolio </Link>
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
        {settings.footerText && <p>{settings.footerText}</p>}

        <div className={footerLinks}>
          {settings.githubUrl && (
            <a href={settings.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
          {settings.linkedinUrl && (
            <a href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
          {settings.email && <a href={`mailto:${settings.email}`}>Email</a>}
        </div>

      </footer>
    </div>
  );
};

export default Layout;
