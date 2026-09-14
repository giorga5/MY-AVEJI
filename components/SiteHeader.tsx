"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface SiteHeaderProps {
  storeName: string;
  tagline: string | null;
  logoSrc: string;
}

/**
 * Ports js/main.js's nav-toggle + scroll-shadow logic 1:1, keeping the exact
 * same DOM nesting (header.site-header > div.container > nav#main-nav) as
 * the original static markup. This matters: css/styles.css puts the header's
 * blur/background on a ::before pseudo-element specifically so
 * `backdrop-filter` never lands on .site-header itself -- backdrop-filter
 * creates a CSS containing block for position:fixed descendants, which
 * would break the fixed off-canvas mobile nav nested inside this header.
 * Do not introduce an extra wrapper <div> with a transform/filter here.
 */
export default function SiteHeader({ storeName, tagline, logoSrc }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="container">
        <a href="/#top" className="brand" aria-label={`${storeName} — მთავარი გვერდი`}>
          <span className="brand-mark">
            <Image src={logoSrc} alt={`${storeName} ლოგო`} width={44} height={44} />
          </span>
          <span className="brand-name">
            {storeName}
            <span>{tagline}</span>
          </span>
        </a>

        <nav className={`main-nav${isOpen ? " is-open" : ""}`} id="main-nav" aria-label="მთავარი ნავიგაცია">
          <a href="/#home" onClick={() => setIsOpen(false)}>
            მთავარი გვერდი
          </a>
          <a href="/#categories" onClick={() => setIsOpen(false)}>
            კატეგორიები
          </a>
          <a href="/products" onClick={() => setIsOpen(false)}>
            კატალოგი
          </a>
          <a href="/#contact" className="btn btn-primary btn-sm" onClick={() => setIsOpen(false)}>
            კონტაქტი
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="nav-toggle"
            id="nav-toggle"
            aria-expanded={isOpen}
            aria-controls="main-nav"
            aria-label="მენიუს გახსნა"
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg className="icon-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg className="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round">
              <line x1="5" y1="5" x2="19" y2="19" />
              <line x1="19" y1="5" x2="5" y2="19" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
