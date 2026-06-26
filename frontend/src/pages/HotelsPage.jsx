import { useEffect, useState } from "react";
import HotelCard from "../components/HotelCard";
import API from "../services/api";

const SKELETON_COUNT = 6;

function HotelsPage() {
    const [hotels,  setHotels]  = useState([]);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState("");

    useEffect(() => { fetchHotels(); }, []);

    const fetchHotels = async () => {
        try {
            setLoading(true);
            const response = await API.get("/hotels");
            setHotels(response.data);
        } catch (error) {
            setError("Could not load hotels. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="page-title">Available hotels</h1>
            <p className="page-subtitle">
                {loading ? "Finding stays for you…" : `${hotels.length} ${hotels.length === 1 ? "stay" : "stays"} ready to book`}
            </p>

            {error && (
                <div style={{
                    background: "var(--color-danger-bg)",
                    color: "var(--color-danger)",
                    border: "1px solid #FECACA",
                    borderRadius: "var(--radius-sm)",
                    padding: "12px 16px",
                    marginBottom: 24,
                    fontSize: "0.9rem",
                    fontWeight: 500,
                }}>
                    ⚠️ {error}
                </div>
            )}

            {loading ? (
                <div className="hotel-grid">
                    {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                        <div key={i} className="hotel-card hotel-card-skeleton">
                            <div className="hotel-image" />
                            <div className="hotel-content">
                                <div className="skeleton skeleton-title" style={{ width: "70%", marginBottom: 10 }} />
                                <div className="skeleton skeleton-text"  style={{ width: "50%", marginBottom: 8  }} />
                                <div className="skeleton skeleton-text"  style={{ width: "40%", marginBottom: 8  }} />
                                <div className="skeleton skeleton-text"  style={{ width: "90%", marginBottom: 16 }} />
                                <div className="skeleton" style={{ height: 44, borderRadius: "var(--radius-sm)" }} />
                            </div>
                        </div>
                    ))}
                </div>
            ) : hotels.length === 0 ? (
                <div className="empty-bookings">
                    <h3>No hotels available</h3>
                    <p>Check back soon — new properties are added regularly.</p>
                </div>
            ) : (
                <div className="hotel-grid">
                    {hotels.map((hotel) => (
                        <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HotelsPage;
