import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const SKELETON_ROWS = [1, 2, 3, 4, 5, 6];

const UsersPage = () => {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");
  const [search, setSearch]     = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch("http://localhost:8000/admin/users", { headers })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(setUsers)
      .catch(() => setError("Failed to load users. Is the user service running?"))
      .finally(() => setLoading(false));
  }, []);

  const initials = (name = "") =>
    name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";

  const filtered = users.filter(u =>
    search === "" ||
    (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Users">

      <div className="page-header-row">
        <h1>Users</h1>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {error && <div className="form-error-msg">{error}</div>}

      <div className="table-card">
        <div className="table-card-header">
          <div>
            <div className="table-card-title">All Users</div>
            <div className="table-card-sub">
              {loading ? "Loading…" : `${filtered.length} user${filtered.length !== 1 ? "s" : ""}`}
            </div>
          </div>
        </div>

        {loading ? (
          <table>
            <thead>
              <tr><th>User</th><th>Status</th><th>Bookings</th><th>Joined</th><th></th></tr>
            </thead>
            <tbody>
              {SKELETON_ROWS.map(i => (
                <tr key={i} className="skeleton-row">
                  <td><div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="skeleton skeleton-avatar" />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton skeleton-text" style={{ width: "130px", marginBottom: 6 }} />
                      <div className="skeleton skeleton-text" style={{ width: "190px" }} />
                    </div>
                  </div></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "60px" }} /></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "40px" }} /></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "90px" }} /></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "50px" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : filtered.length === 0 ? (
          <div className="table-empty">
            <div className="table-empty-icon">👥</div>
            <h3>{search ? "No users match your search" : "No users yet"}</h3>
            <p>{search ? "Try a different name or email." : "Users will appear here once people register."}</p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Status</th>
                <th>Bookings</th>
                <th>Joined</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
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
                  <td>
                    <span className={`badge ${u.is_active !== false ? "badge-green" : "badge-red"}`}>
                      {u.is_active !== false ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>{u.total_bookings ?? "—"}</td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleDateString("en-IN") : "—"}</td>
                  <td>
                    <Link to={`/users/${u.id}`} className="icon-btn">View →</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </AdminLayout>
  );
};

export default UsersPage;
