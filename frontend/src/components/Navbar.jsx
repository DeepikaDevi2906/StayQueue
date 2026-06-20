import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">

                <h2>Hotel Booking</h2>

                <div className="nav-links">

                    <Link to="/hotels">
                        Hotels
                    </Link>

                    <Link to="/my-bookings">
                        My Bookings
                    </Link>

                    <Link to="/">
                        Logout
                    </Link>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;