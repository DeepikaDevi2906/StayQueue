import { useEffect, useState } from "react";

import API from "../services/api";

function MyBookingsPage() {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchBookings();

    }, []);

    const fetchBookings = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await API.get(
                "/bookings/my-bookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setBookings(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h1 className="page-title">
                My bookings
            </h1>

            <p className="page-subtitle">
                Every stay you've booked through TouraX, in one place.
            </p>

            {
                loading ? (

                    <p className="page-subtitle">
                        Loading your bookings...
                    </p>

                ) : bookings.length === 0 ? (

                    <div className="empty-bookings">

                        <h3>No bookings yet</h3>

                        <p>
                            Start exploring hotels and make your first booking.
                        </p>

                    </div>

                ) : (

                    <div className="booking-grid">

                        {
                            bookings.map((booking) => (

                                <div
                                    key={booking.id}
                                    className="booking-card-history"
                                >

                                    <div className="booking-badge">
                                        Confirmed
                                    </div>

                                    <h3>Booking #{booking.id}</h3>

                                    <p className="booking-id">
                                        ROOM-{booking.room_id}
                                    </p>

                                    <p>Check in: {booking.check_in}</p>

                                    <p>Check out: {booking.check_out}</p>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );
}

export default MyBookingsPage;