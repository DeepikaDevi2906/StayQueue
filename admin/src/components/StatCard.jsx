const StatCard = ({ title, value, icon, iconBg, sub, loading }) => {
  if (loading) {
    return (
      <div className="stat-card">
        <div className="stat-card-header">
          <div className="skeleton skeleton-text" style={{ width: "80px" }} />
          <div className="skeleton skeleton-icon" />
        </div>
        <div className="skeleton skeleton-title" style={{ width: "60px" }} />
        <div className="skeleton skeleton-text" style={{ width: "120px" }} />
      </div>
    );
  }

  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-card-label">{title}</span>
        {icon && (
          <div
            className="stat-card-icon"
            style={{ background: iconBg || "var(--indigo-50)" }}
          >
            {icon}
          </div>
        )}
      </div>
      <div className="stat-card-value">{value ?? "—"}</div>
      {sub && <div className="stat-card-sub">{sub}</div>}
    </div>
  );
};

export default StatCard;
