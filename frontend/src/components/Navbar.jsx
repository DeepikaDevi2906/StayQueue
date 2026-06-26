import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav>
            <h2>StayQueue</h2>
            <div>
                <Link to="/hotels">Hotels</Link>
                <Link to="/my-bookings">My Bookings</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout} style={{ width: "auto", padding: "8px 16px" }}>
                    Sign out
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
