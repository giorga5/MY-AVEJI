import { getSiteSettings } from "@/lib/data";
import ContentForm from "@/components/admin/ContentForm";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>საიტის კონტენტი</h1>
          <p>შეცვალეთ ტექსტი და საკონტაქტო ინფორმაცია — ცვლილება საიტზე მაშინვე აისახება</p>
        </div>
      </div>
      <ContentForm settings={settings} />
    </>
  );
}
