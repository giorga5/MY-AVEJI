import type { SiteSettings } from "@/lib/types";
import { buildWhatsappLink } from "@/lib/whatsapp";

export default function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const storeName = settings?.store_name ?? "MY AVEJI";
  const tagline = settings?.tagline ?? "";
  const phone = settings?.phone ?? null;
  const phone2 = settings?.phone_2 ?? null;
  const address = settings?.address ?? null;
  const facebookUrl = settings?.facebook_url ?? null;
  const instagramUrl = settings?.instagram_url ?? null;
  const whatsappLink = buildWhatsappLink(settings?.whatsapp_number);
  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : null;
  const tel2Href = phone2 ? `tel:${phone2.replace(/\s+/g, "")}` : null;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand-name">
              {storeName}
              <span>{tagline}</span>
            </span>
            <p>ხარისხიანი ავეჯი თქვენი სახლისთვის.</p>
            {(facebookUrl || instagramUrl || whatsappLink) && (
              <div className="social-row">
                {whatsappLink && (
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="WhatsApp">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4 8.5 8.5 0 0 1-4-1L3 20l1.1-4.3A8.4 8.4 0 1 1 21 11.5Z" />
                    </svg>
                  </a>
                )}
                {facebookUrl && (
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 8.5h2.5V5h-2.5c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v6h3v-6h2.5l.5-3h-3V9c0-.3.2-.5.5-.5Z" />
                    </svg>
                  </a>
                )}
                {instagramUrl && (
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none" />
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="footer-col">
            <h4>ნავიგაცია</h4>
            <ul>
              <li>
                <a href="/#home">მთავარი გვერდი</a>
              </li>
              <li>
                <a href="/#categories">კატეგორიები</a>
              </li>
              <li>
                <a href="/products">კატალოგი</a>
              </li>
              <li>
                <a href="/#contact">კონტაქტი</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>კონტაქტი</h4>
            <ul>
              {address && (
                <li>
                  <p>{address}</p>
                </li>
              )}
              {telHref && (
                <li>
                  <a href={telHref}>{phone}</a>
                </li>
              )}
              {tel2Href && (
                <li>
                  <a href={tel2Href}>{phone2}</a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {storeName}. ყველა უფლება დაცულია.
          </span>
        </div>
      </div>
    </footer>
  );
}
