import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import ActivityCard from "../components/ActivityCard";

const EVENT_FILTERS = [
  { label: "All",           value: "" },
  { label: "Bookings",      value: "booking_created" },
  { label: "Emails",        value: "email_sent" },
  { label: "Notifications", value: "notification_sent" },
  { label: "Cancellations", value: "booking_cancelled" },
];

const SKELETON_COUNT = 8;

const ActivityLogsPage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [filter, setFilter]         = useState("");

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch("http://localhost:8000/admin/activity", { headers })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(setActivities)
      .catch(() => setError("Failed to load activity logs. Is the analytics service running?"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activities.filter(a =>
    filter === "" || a.event_type === filter || a.event === filter
  );

  const EVENT_COLORS = {
    booking_created:   "#6366F1",
    email_sent:        "#059669",
    notification_sent: "#D97706",
    booking_cancelled: "#DC2626",
    hotel_created:     "#2563EB",
  };

  return (
    <AdminLayout title="Activity Logs">

      <div className="page-header">
        <h1>Activity Logs</h1>
        <p>Real-time event stream from all microservices via RabbitMQ</p>
      </div>

      {/* Filter tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {EVENT_FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={filter === f.value ? "btn btn-primary" : "btn btn-secondary"}
            style={{ width: "auto", padding: "7px 14px" }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {error && <div className="form-error-msg" style={{ marginBottom: 20 }}>{error}</div>}

      <div className="table-card">
        <div className="table-card-header">
          <div>
            <div className="table-card-title">Event Stream</div>
            <div className="table-card-sub">
              {loading ? "Loading…" : `${filtered.length} event${filtered.length !== 1 ? "s" : ""}`}
            </div>
          </div>
          {!loading && activities.length > 0 && (
            <div className="badge badge-green">● Live</div>
          )}
        </div>

        {loading ? (
          <div className="activity-list">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <div key={i} className="activity-item">
                <div className="skeleton" style={{ width: 10, height: 10, borderRadius: "50%", flexShrink: 0, marginTop: 5 }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text" style={{ width: "220px", marginBottom: 6 }} />
                  <div className="skeleton skeleton-text" style={{ width: "160px" }} />
                </div>
                <div className="skeleton skeleton-text" style={{ width: "80px" }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="table-empty">
            <div className="table-empty-icon">📋</div>
            <h3>{filter ? "No events of this type" : "No activity recorded"}</h3>
            <p>
              {filter
                ? "Try a different filter."
                : "Events stream in here as bookings are created and processed."}
            </p>
          </div>
        ) : (
          <div className="activity-list">
            {filtered.map((a, i) => {
              const color = EVENT_COLORS[a.event_type || a.event] || "#94A3B8";
              return (
                <div key={i} className="activity-item">
                  <div className="activity-dot" style={{ background: color }} />
                  <div className="activity-body">
                    <div className="activity-event">{a.event || a.event_type}</div>
                    {a.details && <div className="activity-meta">{a.details}</div>}
                    {a.user_id && (
                      <div className="activity-meta">User #{a.user_id}{a.booking_id ? ` · Booking #${a.booking_id}` : ""}</div>
                    )}
                  </div>
                  <div className="activity-time">
                    {a.timestamp || a.created_at
                      ? new Date(a.timestamp || a.created_at).toLocaleString("en-IN", {
                          day: "2-digit", month: "short",
                          hour: "2-digit", minute: "2-digit",
                        })
                      : "—"
                    }
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </AdminLayout>
  );
};

export default ActivityLogsPage;
