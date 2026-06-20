import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function HotelsPage() {

    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        fetchHotels();

    }, []);

    const fetchHotels = async () => {

        try {

            setLoading(true);

            const response = await API.get(
                "/hotels"
            );

            setHotels(
                response.data
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h1 className="page-title">
                Available Hotels
            </h1>

            <p className="page-subtitle">
                {hotels.length} {hotels.length === 1 ? "stay" : "stays"} ready to book
            </p>

            {
                loading ? (

                    <p className="page-subtitle">
                        Loading hotels...
                    </p>

                ) : hotels.length === 0 ? (

                    <div className="empty-bookings">
                        <h3>No hotels available</h3>
                        <p>Check back soon for new listings.</p>
                    </div>

                ) : (

                    <div className="hotel-grid">

                        {
                            hotels.map((hotel) => (

                                <div
                                    key={hotel.id}
                                    className="hotel-card"
                                >

                                    <div className="hotel-image">
                                        🏨
                                    </div>

                                    <div className="hotel-content">

                                        <h3>
                                            {hotel.name}
                                        </h3>

                                        <p className="hotel-location">
                                            {hotel.city}
                                        </p>

                                        <p className="hotel-rating">
                                            {hotel.rating} rating
                                        </p>

                                        <p>
                                            {hotel.description}
                                        </p>

                                        <button
                                            className="book-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/book/${hotel.id}`
                                                )
                                            }
                                        >
                                            Book now
                                        </button>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>
    );
}

export default HotelsPage;