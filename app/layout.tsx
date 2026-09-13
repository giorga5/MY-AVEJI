import type { Metadata } from "next";
import "../css/styles.css";

export const metadata: Metadata = {
  title: "MY AVEJI — ავეჯის მაღაზია თბილისში",
  description:
    "MY AVEJI — ხარისხიანი ავეჯი თბილისში. დივნები, მაგიდები, საწოლები და კარადები.",
  openGraph: {
    title: "MY AVEJI — ავეჯის მაღაზია თბილისში",
    description: "ხარისხიანი ავეჯი თბილისში — ეწვიეთ ჩვენს სავაჭრო დარბაზს.",
    type: "website",
    locale: "ka_GE",
    images: ["/Media/logo.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ka">
      <head>
        <link rel="icon" type="image/jpeg" href="/Media/logo.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Georgian:wght@500;600;700&family=Noto+Sans+Georgian:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
