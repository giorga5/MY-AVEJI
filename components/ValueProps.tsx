export default function ValueProps() {
  return (
    <section className="section-pad section-alt">
      <div className="container">
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l7 3v6c0 4.8-3 8.4-7 9-4-.6-7-4.2-7-9V6l7-3Z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>მაღალი ხარისხი</h3>
            <p>ვირჩევთ მხოლოდ გამძლე და ხანგრძლივ მასალებს ყოველი ნივთისთვის.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h11v9H3z" />
                <path d="M14 10h4l3 3v3h-7z" />
                <circle cx="7" cy="18" r="1.6" />
                <circle cx="17.5" cy="18" r="1.6" />
              </svg>
            </div>
            <h3>მიწოდება თბილისში</h3>
            <p>სწრაფი მიწოდება და აწყობა თბილისის მასშტაბით.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4 8.5 8.5 0 0 1-4-1L3 20l1.1-4.3A8.4 8.4 0 1 1 21 11.5Z" />
              </svg>
            </div>
            <h3>პირადი კონსულტაცია</h3>
            <p>მოგვინახულეთ სავაჭრო ცენტრ საბაში პროდუქციის ნახვისთვის.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
                <circle cx="12" cy="9.5" r="2.5" />
              </svg>
            </div>
            <h3>მარტივი მოძიება</h3>
            <p>მოსახერხებელი მდებარეობა — თბილისის ცენტრში.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
