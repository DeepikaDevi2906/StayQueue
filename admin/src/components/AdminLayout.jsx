import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children, title }) => {
  return (
    <div className="admin-shell">
      <AdminSidebar />

      <div className="admin-content">
        <header className="admin-topbar">
          <span className="topbar-title">{title || "StayQueue Admin"}</span>
          <div className="topbar-actions">
            <span className="topbar-badge">Admin Portal</span>
          </div>
        </header>

        <main className="admin-main">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
