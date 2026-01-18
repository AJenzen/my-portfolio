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
          url
          title
        }

        linkedinIcon {
          url
          title
        }

        emailIcon {
          url
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
              <img
                src={settings.githubIcon.url}
                alt={settings.githubIcon.title || "GitHub"}
                width="30"
                height="30"
                loading="lazy"
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
              <img
                src={settings.linkedinIcon.url}
                alt={settings.linkedinIcon.title || "LinkedIn"}
                width="30"
                height="30"
                loading="lazy"
              />
            </a>
          )}

          {settings?.email && settings?.emailIcon && (
            <a href={`mailto:${settings.email}`} aria-label="Email">
              <img
                src={settings.emailIcon.url}
                alt={settings.emailIcon.title || "Email"}
                width="30"
                height="30"
                loading="lazy"
              />
            </a>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
