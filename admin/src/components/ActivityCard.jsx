const EVENT_COLORS = {
  booking_created:       "#6366F1",
  email_sent:            "#059669",
  notification_sent:     "#D97706",
  booking_cancelled:     "#DC2626",
  hotel_created:         "#2563EB",
};

const ActivityCard = ({ activity }) => {
  const color = EVENT_COLORS[activity.event_type] || "#94A3B8";

  const formatTime = (ts) => {
    if (!ts) return "—";
    try {
      return new Date(ts).toLocaleString("en-IN", {
        day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
      });
    } catch { return ts; }
  };

  return (
    <div className="activity-item">
      <div className="activity-dot" style={{ background: color }} />
      <div className="activity-body">
        <div className="activity-event">{activity.event || activity.event_type}</div>
        {activity.details && (
          <div className="activity-meta">{activity.details}</div>
        )}
      </div>
      <div className="activity-time">{formatTime(activity.timestamp || activity.created_at)}</div>
    </div>
  );
};

export default ActivityCard;
