import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    const isActive = (path) => location.pathname.startsWith(path);

    return (

        <aside className="sidebar">

            <Link
                to="/hotels"
                className={isActive("/hotels") ? "active" : ""}
            >
                Hotels
            </Link>

            <Link
                to="/my-bookings"
                className={isActive("/my-bookings") ? "active" : ""}
            >
                My bookings
            </Link>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>

        </aside>

    );
}

export default Sidebar;