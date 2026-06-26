import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect }    from "react";
import API from "../services/api";

function BookingPage() {
    const { hotelId } = useParams();
    const navigate    = useNavigate();

    const [hotel,    setHotel]    = useState(null);
    const [checkIn,  setCheckIn]  = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loading,  setLoading]  = useState(false);
    const [error,    setError]    = useState("");
    const [success,  setSuccess]  = useState(false);

    useEffect(() => {
        if (hotelId) {
            API.get(`/hotels/${hotelId}`)
                .then(r => setHotel(r.data))
                .catch(() => {});
        }
    }, [hotelId]);

    const nights = checkIn && checkOut
        ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
        : 0;

    const pricePerNight = hotel?.price_per_night || 3500;
    const totalPrice    = nights * pricePerNight;

    const handleBooking = async () => {
        if (!checkIn || !checkOut) { setError("Please select check-in and check-out dates."); return; }
        if (new Date(checkOut) <= new Date(checkIn)) { setError("Check-out must be after check-in."); return; }

        setError("");
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            await API.post(
                "/bookings",
                { room_id: Number(hotelId), check_in: checkIn, check_out: checkOut },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess(true);
        } catch (err) {
            setError(err.response?.data?.detail || "Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="booking-wrapper">
                <div style={{
                    background: "var(--color-success-bg)",
                    border: "1px solid #6EE7B7",
                    borderRadius: "var(--radius-lg)",
                    padding: "48px 40px",
                    textAlign: "center",
                    maxWidth: 480,
                }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                    <h2 style={{ fontFamily: "var(--font-display)", marginBottom: 8 }}>Booking confirmed!</h2>
                    <p style={{ color: "var(--color-text-muted)", marginBottom: 28 }}>
                        You're all set. A confirmation email is on its way.
                    </p>
                    <button onClick={() => navigate("/my-bookings")} style={{ width: "auto", padding: "12px 28px" }}>
                        View my bookings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-wrapper">

            <h1 className="page-title">Book your stay</h1>
            <p className="page-subtitle">
                {hotel ? hotel.name : `Hotel #${hotelId}`}
                {hotel?.city ? ` · ${hotel.city}` : ""}
            </p>

            <div className="booking-container">

                {/* Form */}
                <div className="booking-card">
                    <h2 style={{ fontFamily: "var(--font-display)", marginBottom: 6 }}>Select dates</h2>
                    <p className="booking-subtitle">Choose your check-in and check-out dates</p>

                    {error && <p className="form-error">{error}</p>}

                    <div className="form-group">
                        <label>Check in</label>
                        <input
                            type="date"
                            value={checkIn}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={(e) => { setCheckIn(e.target.value); setError(""); }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Check out</label>
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn || new Date().toISOString().split("T")[0]}
                            onChange={(e) => { setCheckOut(e.target.value); setError(""); }}
                        />
                    </div>

                    <button
                        className="book-btn"
                        onClick={handleBooking}
                        disabled={loading}
                        style={{ marginTop: 8 }}
                    >
                        {loading ? "Confirming booking…" : "Confirm booking"}
                    </button>
                </div>

                {/* Summary */}
                <div className="summary-card">
                    <h3>Booking summary</h3>

                    <div className="summary-item">
                        <span>Hotel</span>
                        <span>{hotel?.name || `#${hotelId}`}</span>
                    </div>
                    <div className="summary-item">
                        <span>Location</span>
                        <span>{hotel?.city || "—"}</span>
                    </div>
                    <div className="summary-item">
                        <span>Check in</span>
                        <span>{checkIn  || "—"}</span>
                    </div>
                    <div className="summary-item">
                        <span>Check out</span>
                        <span>{checkOut || "—"}</span>
                    </div>
                    <div className="summary-item">
                        <span>Nights</span>
                        <span>{nights || "—"}</span>
                    </div>
                    <div className="summary-item">
                        <span>Rate</span>
                        <span>₹{pricePerNight.toLocaleString("en-IN")} / night</span>
                    </div>
                    <div className="summary-item total">
                        <span>Total</span>
                        <span>{nights ? `₹${totalPrice.toLocaleString("en-IN")}` : "—"}</span>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default BookingPage;
