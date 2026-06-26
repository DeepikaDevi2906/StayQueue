import { useEffect, useState } from "react";
import { useNavigate }          from "react-router-dom";
import API from "../services/api";

const SKELETON_COUNT = 4;

function MyBookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading,  setLoading]  = useState(true);
    const [error,    setError]    = useState("");
    const navigate = useNavigate();

    useEffect(() => { fetchBookings(); }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const token    = localStorage.getItem("token");
            const response = await API.get("/bookings/my", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(response.data);
        } catch (error) {
            setError("Could not load your bookings.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (d) => {
        if (!d) return "—";
        try { return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }); }
        catch { return d; }
    };

    const statusClass = (s) =>
        s === "confirmed" ? "" : s === "cancelled" ? "cancelled" : "pending";

    return (
        <div>
            <h1 className="page-title">My bookings</h1>
            <p className="page-subtitle">Every stay you've booked through StayQueue, in one place.</p>

            {error && (
                <div style={{
                    background: "var(--color-danger-bg)", color: "var(--color-danger)",
                    border: "1px solid #FECACA", borderRadius: "var(--radius-sm)",
                    padding: "12px 16px", marginBottom: 24, fontSize: "0.9rem", fontWeight: 500,
                }}>
                    ⚠️ {error}
                </div>
            )}

            {loading ? (
                <div className="booking-grid">
                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <div key={i} className="booking-card-history">
                            <div className="skeleton skeleton-text" style={{ width: "40%", marginBottom: 12 }} />
                            <div className="skeleton skeleton-title" style={{ width: "65%", marginBottom: 12 }} />
                            <div className="skeleton skeleton-text" style={{ width: "55%", marginBottom: 8 }} />
                            <div className="skeleton skeleton-text" style={{ width: "55%"  }} />
                        </div>
                    ))}
                </div>
            ) : bookings.length === 0 ? (
                <div className="empty-bookings">
                    <h3>No bookings yet</h3>
                    <p>
                        Start exploring hotels and make your first booking.{" "}
                        <button
                            onClick={() => navigate("/hotels")}
                            style={{ width: "auto", padding: "8px 18px", fontSize: "0.88rem", display: "inline-block", marginTop: 12 }}
                        >
                            Browse hotels
                        </button>
                    </p>
                </div>
            ) : (
                <div className="booking-grid">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="booking-card-history">

                            <span className={`booking-badge ${statusClass(booking.status)}`}>
                                {booking.status || "Confirmed"}
                            </span>

                            <h3>Booking #{booking.id}</h3>

                            <p className="booking-id">ROOM-{booking.room_id}</p>

                            <p>📅 Check in: {formatDate(booking.check_in)}</p>
                            <p>📅 Check out: {formatDate(booking.check_out)}</p>

                            {booking.total_price && (
                                <p style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: "var(--color-primary-dark)", marginTop: 8 }}>
                                    ₹{Number(booking.total_price).toLocaleString("en-IN")}
                                </p>
                            )}

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyBookingsPage;
