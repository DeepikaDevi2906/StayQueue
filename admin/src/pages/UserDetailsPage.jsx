import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser]         = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState("");

  useEffect(() => {
    if (!userId) return;
    const token = localStorage.getItem("admin_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    Promise.all([
      fetch(`http://localhost:8000/admin/users/${userId}`, { headers }).then(r => r.ok ? r.json() : null),
      fetch(`http://localhost:8000/admin/users/${userId}/bookings`, { headers }).then(r => r.ok ? r.json() : []),
    ])
      .then(([u, b]) => { setUser(u); setBookings(b || []); })
      .catch(() => setError("Failed to load user details."))
      .finally(() => setLoading(false));
  }, [userId]);

  const initials = (name = "") =>
    name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";

  return (
    <AdminLayout title="User Details">

      <div className="page-header-row">
        <Link to="/users" className="btn btn-secondary">← Back to Users</Link>
      </div>

      {error && <div className="form-error-msg" style={{ marginBottom: 20 }}>{error}</div>}

      {loading ? (
        <div className="detail-grid">
          {[1, 2].map(i => (
            <div key={i} className="detail-card">
              <div className="skeleton skeleton-text" style={{ width: "80px", marginBottom: 16 }} />
              {[1, 2, 3, 4].map(j => (
                <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <div className="skeleton skeleton-text" style={{ width: "100px" }} />
                  <div className="skeleton skeleton-text" style={{ width: "140px" }} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : !user ? (
        <div className="table-card">
          <div className="table-empty">
            <div className="table-empty-icon">🔍</div>
            <h3>User not found</h3>
            <p>No user exists with ID {userId}.</p>
          </div>
        </div>
      ) : (
        <>
          {/* Profile header */}
          <div className="detail-card" style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 20 }}>
            <div className="user-initials" style={{ width: 56, height: 56, fontSize: "1.2rem" }}>
              {initials(user.name || user.email)}
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700 }}>
                {user.name || "—"}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>{user.email}</div>
            </div>
            <span
              className={`badge ${user.is_active !== false ? "badge-green" : "badge-red"}`}
              style={{ marginLeft: "auto" }}
            >
              {user.is_active !== false ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="detail-grid">
            {/* Account info */}
            <div className="detail-card">
              <div className="detail-card-title">Account Info</div>
              <div className="detail-row"><span className="detail-label">User ID</span><span className="detail-value" style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{user.id}</span></div>
              <div className="detail-row"><span className="detail-label">Name</span><span className="detail-value">{user.name || "—"}</span></div>
              <div className="detail-row"><span className="detail-label">Email</span><span className="detail-value">{user.email}</span></div>
              <div className="detail-row"><span className="detail-label">Joined</span><span className="detail-value">{user.created_at ? new Date(user.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—"}</span></div>
            </div>

            {/* Delivery status */}
            <div className="detail-card">
              <div className="detail-card-title">Delivery Status</div>
              <div className="detail-row">
                <span className="detail-label">Total Bookings</span>
                <span className="detail-value">{user.total_bookings ?? bookings.length}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email Sent</span>
                <span className={`badge ${user.email_sent ? "badge-green" : "badge-amber"}`}>
                  {user.email_sent ? "Sent" : "Pending"}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Notification Sent</span>
                <span className={`badge ${user.notification_sent ? "badge-green" : "badge-amber"}`}>
                  {user.notification_sent ? "Sent" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          {/* Bookings table */}
          <div className="table-card">
            <div className="table-card-header">
              <div>
                <div className="table-card-title">Booking History</div>
                <div className="table-card-sub">{bookings.length} booking{bookings.length !== 1 ? "s" : ""}</div>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="table-empty">
                <div className="table-empty-icon">📅</div>
                <h3>No bookings yet</h3>
                <p>This user hasn't made any bookings.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Hotel / Room</th>
                    <th>Check-in</th>
                    <th>Check-out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id}>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--text-muted)" }}>#{b.id}</td>
                      <td>{b.hotel_name || b.room_id || "—"}</td>
                      <td>{b.check_in ? new Date(b.check_in).toLocaleDateString("en-IN") : "—"}</td>
                      <td>{b.check_out ? new Date(b.check_out).toLocaleDateString("en-IN") : "—"}</td>
                      <td>
                        <span className={`badge ${
                          b.status === "confirmed" ? "badge-green" :
                          b.status === "cancelled" ? "badge-red"   : "badge-amber"
                        }`}>
                          {b.status || "pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </AdminLayout>
  );
};

export default UserDetailsPage;
