import "../../css/admin.css";

export const metadata = {
  title: "MY AVEJI — Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
