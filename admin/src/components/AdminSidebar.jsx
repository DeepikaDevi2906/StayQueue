import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/",           icon: "⊞",  label: "Dashboard"      },
  { to: "/users",      icon: "👥",  label: "Users"          },
  { to: "/hotels",     icon: "🏨",  label: "Hotels"         },
  { to: "/activities", icon: "📋",  label: "Activity Logs"  },
];

const AdminSidebar = () => {
  const { pathname } = useLocation();

  const isActive = (to) => {
    if (to === "/") return pathname === "/";
    return pathname.startsWith(to);
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🏨</div>
        <div>
          <div className="sidebar-brand-name">StayQueue</div>
          <div className="sidebar-brand-tag">Admin</div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sidebar-section-label">Navigation</div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <Link
            key={to}
            to={to}
            className={isActive(to) ? "active" : ""}
          >
            <span className="sidebar-nav-icon">{icon}</span>
            {label}
          </Link>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">A</div>
          <div>
            <div className="sidebar-user-name">Admin</div>
            <div className="sidebar-user-role">Super Admin</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
