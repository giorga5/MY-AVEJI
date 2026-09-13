import type { SiteSettings } from "@/lib/types";
import { buildWhatsappLink } from "@/lib/whatsapp";

export default function ContactSection({ settings }: { settings: SiteSettings | null }) {
  const phone = settings?.phone ?? null;
  const phone2 = settings?.phone_2 ?? null;
  const address = settings?.address ?? null;
  const hours = settings?.business_hours ?? null;
  const mapEmbedUrl = settings?.map_embed_url ?? null;
  const whatsappLink = buildWhatsappLink(settings?.whatsapp_number);
  const facebookUrl = settings?.facebook_url ?? null;
  const instagramUrl = settings?.instagram_url ?? null;
  const telHref = phone ? `tel:${phone.replace(/\s+/g, "")}` : null;
  const tel2Href = phone2 ? `tel:${phone2.replace(/\s+/g, "")}` : null;

  return (
    <section id="contact" className="section-pad">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">დაგვიკავშირდით</span>
          <h2>კონტაქტი</h2>
        </div>

        <div className="contact-grid">
          <div>
            <div className="contact-info">
              {address && (
                <div className="info-row">
                  <span className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                  </span>
                  <div>
                    <h4>მისამართი</h4>
                    <p style={{ whiteSpace: "pre-line" }}>{address}</p>
                  </div>
                </div>
              )}

              {(telHref || tel2Href) && (
                <div className="info-row">
                  <span className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.7 21 3 14.3 3 6a2 2 0 0 1 1-2Z" />
                    </svg>
                  </span>
                  <div>
                    <h4>ტელეფონი</h4>
                    {telHref && (
                      <p style={{ margin: 0 }}>
                        <a href={telHref}>{phone}</a>
                      </p>
                    )}
                    {tel2Href && (
                      <p style={{ margin: 0 }}>
                        <a href={tel2Href}>{phone2}</a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {whatsappLink && (
                <div className="info-row">
                  <span className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4 8.5 8.5 0 0 1-4-1L3 20l1.1-4.3A8.4 8.4 0 1 1 21 11.5Z" />
                    </svg>
                  </span>
                  <div>
                    <h4>WhatsApp</h4>
                    <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                      მიწერეთ WhatsApp-ზე
                    </a>
                  </div>
                </div>
              )}

              {hours && (
                <div className="info-row">
                  <span className="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3.5 2" />
                    </svg>
                  </span>
                  <div>
                    <h4>სამუშაო საათები</h4>
                    <p style={{ whiteSpace: "pre-line" }}>{hours}</p>
                  </div>
                </div>
              )}
            </div>

            {mapEmbedUrl && (
              <div className="map-frame" style={{ marginTop: "2rem" }}>
                <iframe
                  src={mapEmbedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${settings?.store_name ?? "MY AVEJI"}-ს მდებარეობა რუკაზე`}
                />
              </div>
            )}
          </div>

          <div className="contact-form">
            <h3 style={{ marginBottom: "1.5rem" }}>დაგვიკავშირდით პირდაპირ</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {telHref && (
                <a href={telHref} className="btn btn-primary btn-block">
                  დარეკვა: {phone}
                </a>
              )}
              {tel2Href && (
                <a href={tel2Href} className="btn btn-primary btn-block">
                  დარეკვა: {phone2}
                </a>
              )}
              {whatsappLink && (
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-block">
                  WhatsApp
                </a>
              )}
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-block">
                  გვერდი Facebook-ზე
                </a>
              )}
              {instagramUrl && (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-block">
                  გვერდი Instagram-ზე
                </a>
              )}
              {!telHref && !tel2Href && !whatsappLink && !facebookUrl && !instagramUrl && (
                <p className="form-note">საკონტაქტო ინფორმაცია მალე დაემატება.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
