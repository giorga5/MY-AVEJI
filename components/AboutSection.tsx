export default function AboutSection({ aboutText }: { aboutText: string | null }) {
  if (!aboutText) return null;

  return (
    <section className="section-pad">
      <div className="container">
        <div className="section-head center">
          <span className="eyebrow">ჩვენ შესახებ</span>
          <h2>ჩვენი ისტორია</h2>
          <p style={{ whiteSpace: "pre-line" }}>{aboutText}</p>
        </div>
      </div>
    </section>
  );
}
