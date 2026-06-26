import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import StatCard from "../components/StatCard";

const SKELETON_ROWS = [1, 2, 3, 4, 5];

const AdminDashboard = () => {
  const [stats, setStats]         = useState(null);
  const [recentUsers, setUsers]   = useState([]);
  const [recentActivity, setActivity] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    Promise.all([
      fetch("http://localhost:8000/admin/stats",    { headers }).then(r => r.ok ? r.json() : null),
      fetch("http://localhost:8000/admin/users",    { headers }).then(r => r.ok ? r.json() : []),
      fetch("http://localhost:8000/admin/activity", { headers }).then(r => r.ok ? r.json() : []),
    ])
      .then(([s, u, a]) => {
        setStats(s);
        setUsers((u || []).slice(0, 5));
        setActivity((a || []).slice(0, 6));
      })
      .catch(() => setError("Could not reach the API. Make sure services are running."))
      .finally(() => setLoading(false));
  }, []);

  const initials = (name = "") =>
    name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";

  return (
    <AdminLayout title="Dashboard">

      {error && (
        <div className="form-error-msg" style={{ marginBottom: 24 }}>
          ⚠️ {error}
        </div>
      )}

      {/* Stats */}
      <div className="stats-grid">
        <StatCard loading={loading} title="Total Users"    value={stats?.total_users}    icon="👥" iconBg="var(--indigo-50)"  sub="Registered accounts" />
        <StatCard loading={loading} title="Total Hotels"   value={stats?.total_hotels}   icon="🏨" iconBg="#EFF6FF"           sub="Listed properties" />
        <StatCard loading={loading} title="Total Bookings" value={stats?.total_bookings} icon="📅" iconBg="var(--green-bg)"   sub="All time" />
        <StatCard loading={loading} title="Emails Sent"    value={stats?.emails_sent}    icon="✉️" iconBg="var(--amber-bg)"   sub="Confirmation emails" />
      </div>

      {/* Recent Users */}
      <div className="table-card" style={{ marginBottom: 24 }}>
        <div className="table-card-header">
          <div>
            <div className="table-card-title">Recent Users</div>
            <div className="table-card-sub">Latest registrations</div>
          </div>
          <Link to="/users" className="btn btn-secondary">View all →</Link>
        </div>

        {loading ? (
          <table>
            <tbody>
              {SKELETON_ROWS.map(i => (
                <tr key={i} className="skeleton-row">
                  <td><div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="skeleton skeleton-avatar" />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton skeleton-text" style={{ width: "120px", marginBottom: 6 }} />
                      <div className="skeleton skeleton-text" style={{ width: "180px" }} />
                    </div>
                  </div></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "60px" }} /></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "80px" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : recentUsers.length === 0 ? (
          <div className="table-empty">
            <div className="table-empty-icon">👥</div>
            <h3>No users yet</h3>
            <p>Users will appear here once people register.</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Bookings</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.id}>
                  <td>
                    <div className="user-cell">
                      <div className="user-initials">{initials(u.name || u.email)}</div>
                      <div>
                        <div className="user-name">{u.name || "—"}</div>
                        <div className="user-email">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{u.total_bookings ?? "—"}</td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : "—"}</td>
                  <td>
                    <Link to={`/users/${u.id}`} className="icon-btn">View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Recent Activity */}
      <div className="table-card">
        <div className="table-card-header">
          <div>
            <div className="table-card-title">Recent Activity</div>
            <div className="table-card-sub">System events across all services</div>
          </div>
          <Link to="/activities" className="btn btn-secondary">View all →</Link>
        </div>

        {loading ? (
          <div className="activity-list">
            {SKELETON_ROWS.map(i => (
              <div key={i} className="activity-item">
                <div className="skeleton" style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, marginTop: 5 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text" style={{ width: "200px", marginBottom: 6 }} />
                  <div className="skeleton skeleton-text" style={{ width: "140px" }} />
                </div>
                <div className="skeleton skeleton-text" style={{ width: "80px" }} />
              </div>
            ))}
          </div>
        ) : recentActivity.length === 0 ? (
          <div className="table-empty">
            <div className="table-empty-icon">📋</div>
            <h3>No activity yet</h3>
            <p>Events will stream here as bookings are made.</p>
          </div>
        ) : (
          <div className="activity-list">
            {recentActivity.map((a, i) => (
              <div key={i} className="activity-item">
                <div className="activity-dot" style={{ background: "#6366F1" }} />
                <div className="activity-body">
                  <div className="activity-event">{a.event || a.event_type}</div>
                  {a.details && <div className="activity-meta">{a.details}</div>}
                </div>
                <div className="activity-time">
                  {a.timestamp ? new Date(a.timestamp).toLocaleTimeString() : "—"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </AdminLayout>
  );
};

export default AdminDashboard;
