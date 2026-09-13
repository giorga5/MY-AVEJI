import Image from "next/image";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "შესვლა — MY AVEJI Admin",
};

export default function AdminLoginPage() {
  return (
    <div className="admin-body admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <span className="brand-mark">
            <Image src="/Media/logo.jpg" alt="MY AVEJI" width={56} height={56} />
          </span>
          <h1>ადმინ პანელი</h1>
          <p>შედით თქვენი მომხმარებლის სახელით და პაროლით</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
