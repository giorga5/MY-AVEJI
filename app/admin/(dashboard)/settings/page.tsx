import PasswordForm from "@/components/admin/PasswordForm";

export default function AdminSettingsPage() {
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>პარამეტრები</h1>
          <p>ანგარიშის უსაფრთხოების პარამეტრები</p>
        </div>
      </div>
      <PasswordForm />
      <div className="admin-card" style={{ maxWidth: "480px" }}>
        <h3 style={{ marginBottom: "0.75rem" }}>მომხმარებლის სახელის შეცვლა</h3>
        <p style={{ color: "var(--color-text-muted)", fontSize: "var(--fs-sm)" }}>
          მომხმარებლის სახელის შეცვლა შესაძლებელია მხოლოდ Supabase-ის მართვის პანელიდან
          (Authentication → Users). დამატებითი დახმარებისთვის იხილეთ README.md ფაილი პროექტში.
        </p>
      </div>
    </>
  );
}
