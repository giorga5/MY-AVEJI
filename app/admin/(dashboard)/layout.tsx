import { requireAdminUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import ToastProvider from "@/components/admin/ToastProvider";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  await requireAdminUser();

  return (
    <div className="admin-body">
      <ToastProvider>
        <div className="admin-shell">
          <AdminSidebar />
          <main className="admin-main">{children}</main>
        </div>
      </ToastProvider>
    </div>
  );
}
