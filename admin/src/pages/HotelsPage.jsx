import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const SKELETON_ROWS = [1, 2, 3, 4, 5];

const HotelsPage = () => {
  const [hotels, setHotels]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState("");
  const [search, setSearch]   = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch("http://localhost:8000/hotels", { headers })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(setHotels)
      .catch(() => setError("Failed to load hotels. Is the hotel service running?"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = hotels.filter(h =>
    search === "" ||
    (h.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (h.city || h.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Hotels">

      <div className="page-header-row">
        <h1>Hotels</h1>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              placeholder="Search by name or city…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Link to="/hotels/create" className="btn btn-primary">+ New Hotel</Link>
        </div>
      </div>

      {error && <div className="form-error-msg">{error}</div>}

      <div className="table-card">
        <div className="table-card-header">
          <div>
            <div className="table-card-title">All Hotels</div>
            <div className="table-card-sub">
              {loading ? "Loading…" : `${filtered.length} propert${filtered.length !== 1 ? "ies" : "y"}`}
            </div>
          </div>
        </div>

        {loading ? (
          <table>
            <thead>
              <tr><th>Hotel</th><th>Location</th><th>Rooms</th><th>Rating</th><th>Status</th></tr>
            </thead>
            <tbody>
              {SKELETON_ROWS.map(i => (
                <tr key={i} className="skeleton-row">
                  <td><div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div className="skeleton" style={{ width: 36, height: 36, borderRadius: "var(--r-sm)", flexShrink: 0 }} />
                    <div className="skeleton skeleton-text" style={{ width: "150px" }} />
                  </div></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "100px" }} /></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "40px" }} /></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "50px" }} /></td>
                  <td><div className="skeleton skeleton-text" style={{ width: "60px" }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : filtered.length === 0 ? (
          <div className="table-empty">
            <div className="table-empty-icon">🏨</div>
            <h3>{search ? "No hotels match your search" : "No hotels listed yet"}</h3>
            <p>
              {search
                ? "Try a different name or city."
                : <><Link to="/hotels/create">Create your first hotel</Link> to get started.</>
              }
            </p>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Hotel</th>
                <th>Location</th>
                <th>Rooms</th>
                <th>Rating</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(h => (
                <tr key={h.id}>
                  <td>
                    <div className="user-cell">
                      <div className="hotel-cell-icon">🏨</div>
                      <div>
                        <div className="user-name">{h.name}</div>
                        {h.description && (
                          <div className="user-email" style={{ maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {h.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>{h.city || h.location || "—"}</td>
                  <td>{h.total_rooms ?? "—"}</td>
                  <td>{h.rating ? `${h.rating} ★` : "—"}</td>
                  <td>
                    <span className={`badge ${h.is_active !== false ? "badge-green" : "badge-red"}`}>
                      {h.is_active !== false ? "Active" : "Inactive"}
                    </span>
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

export default HotelsPage;
