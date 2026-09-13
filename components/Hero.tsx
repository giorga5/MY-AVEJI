import Image from "next/image";

interface HeroProps {
  storeName: string;
  tagline: string | null;
  headline: string;
  subtext: string | null;
  logoSrc: string;
}

export default function Hero({ storeName, tagline, headline, subtext, logoSrc }: HeroProps) {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-copy">
          <span className="eyebrow">
            {storeName}
            {tagline ? ` — ${tagline}` : ""}
          </span>
          <h1>{headline}</h1>
          {subtext && <p>{subtext}</p>}
          <div className="hero-actions">
            <a href="#categories" className="btn btn-primary">
              კატალოგის ნახვა
            </a>
            <a href="#contact" className="btn btn-outline">
              დაგვიკავშირდით
            </a>
          </div>
        </div>
        <div className="hero-media">
          <Image
            src={logoSrc}
            alt={`${storeName}-ს ხის ჟურნალის მაგიდა`}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className="hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span>
              <strong>ხელნაკეთი ხარისხი</strong>
              <span>გამძლე მასალები, ზუსტი დამუშავება</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
