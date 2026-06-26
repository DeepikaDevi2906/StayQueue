import { useNavigate } from "react-router-dom";

function HotelCard({ hotel }) {
    const navigate = useNavigate();

    return (
        <div className="hotel-card">

            <div className="hotel-image">🏨</div>

            <div className="hotel-content">
                <h3>{hotel.name}</h3>

                {hotel.city && (
                    <p className="hotel-location">{hotel.city}</p>
                )}

                {hotel.rating && (
                    <p className="hotel-rating">★ {hotel.rating}</p>
                )}

                {hotel.description && (
                    <p>{hotel.description}</p>
                )}

                {hotel.price_per_night && (
                    <p className="hotel-price">
                        ₹{Number(hotel.price_per_night).toLocaleString("en-IN")}
                        <span> / night</span>
                    </p>
                )}

                <button
                    className="book-btn"
                    onClick={() => navigate(`/book/${hotel.id}`)}
                >
                    Book now
                </button>
            </div>

        </div>
    );
}

export default HotelCard;
