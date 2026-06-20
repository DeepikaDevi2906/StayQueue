import { useParams } from "react-router-dom";
import { useState } from "react";

import API from "../services/api";

function BookingPage() {

    const { hotelId } = useParams();

    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {

        if (!checkIn || !checkOut) {
            alert("Please select check-in and check-out dates");
            return;
        }

        if (new Date(checkOut) <= new Date(checkIn)) {
            alert("Check-out must be after check-in");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem(
    "token"
);

const response = await API.post(
    "/bookings",
    {
        room_id: Number(hotelId),
        check_in: checkIn,
        check_out: checkOut
    },
    {
        headers: {
            Authorization:
                `Bearer ${token}`
        }
    }
);

            console.log(response.data);

            alert("Booking successful");

            setCheckIn("");
            setCheckOut("");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.detail ||
                "Booking failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="booking-wrapper">

            <h1 className="page-title">
                Book your stay
            </h1>

            <div className="booking-container">

                <div className="booking-card">

                    <h2>Hotel #{hotelId}</h2>

                    <p className="booking-subtitle">
                        Select your stay dates
                    </p>

                    <div className="form-group">

                        <label>Check in</label>

                        <input
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                        />

                    </div>

                    <div className="form-group">

                        <label>Check out</label>

                        <input
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                        />

                    </div>

                    <button
                        className="book-btn"
                        onClick={handleBooking}
                        disabled={loading}
                    >
                        {loading ? "Booking..." : "Confirm booking"}
                    </button>

                </div>

                <div className="summary-card">

                    <h3>Booking summary</h3>

                    <div className="summary-item">
                        <span>Hotel ID</span>
                        <span>{hotelId}</span>
                    </div>

                    <div className="summary-item">
                        <span>Guests</span>
                        <span>2</span>
                    </div>

                    <div className="summary-item">
                        <span>Room type</span>
                        <span>Deluxe</span>
                    </div>

                    <div className="summary-item total">
                        <span>Price</span>
                        <span>₹3,500 / night</span>
                    </div>

                </div>

            </div>

        </div>

    );
}

export default BookingPage;