import { useEffect, useState } from "react";
import API from "../services/api";

function ProfilePage() {
    const [user,    setUser]    = useState(null);
    const [loading, setLoading] = useState(true);
    const [error,   setError]   = useState("");

    useEffect(() => { fetchProfile(); }, []);

    const fetchProfile = async () => {
        try {
            const token    = localStorage.getItem("token");
            const response = await API.get("/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUser(response.data);
        } catch (err) {
            setError("Could not load your profile.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const initials = (name = "") =>
        name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "?";

    if (loading) {
        return (
            <div>
                <h1 className="page-title">Profile</h1>
                <div className="profile-layout">
                    <div className="profile-card">
                        <div style={{ width: 80, height: 80, borderRadius: "50%", margin: "0 auto 16px" }} className="skeleton" />
                        <div className="skeleton skeleton-title" style={{ width: "60%", margin: "0 auto 8px" }} />
                        <div className="skeleton skeleton-text"  style={{ width: "80%", margin: "0 auto" }}    />
                    </div>
                    <div className="profile-details">
                        {[1,2,3].map(i => (
                            <div key={i} className="profile-row">
                                <div className="skeleton skeleton-text" style={{ width: "30%" }} />
                                <div className="skeleton skeleton-text" style={{ width: "50%" }} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div>
                <h1 className="page-title">Profile</h1>
                <div className="empty-bookings">
                    <h3>Could not load profile</h3>
                    <p>{error || "Please try refreshing the page."}</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="page-title">Profile</h1>
            <p className="page-subtitle">Your StayQueue account details</p>

            <div className="profile-layout">

                {/* Avatar card */}
                <div className="profile-card">
                    <div className="profile-avatar">
                        {initials(user.name || user.email)}
                    </div>
                    <div className="profile-name">{user.name || "—"}</div>
                    <div className="profile-email">{user.email}</div>
                    <span className="profile-badge">● Active account</span>
                </div>

                {/* Details */}
                <div className="profile-details">
                    <h3>Account Information</h3>

                    <div className="profile-row">
                        <span className="profile-row-label">User ID</span>
                        <span className="profile-row-value" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
                            {user.id}
                        </span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-row-label">Full name</span>
                        <span className="profile-row-value">{user.name || "—"}</span>
                    </div>

                    <div className="profile-row">
                        <span className="profile-row-label">Email address</span>
                        <span className="profile-row-value">{user.email}</span>
                    </div>

                    {user.created_at && (
                        <div className="profile-row">
                            <span className="profile-row-label">Member since</span>
                            <span className="profile-row-value">
                                {new Date(user.created_at).toLocaleDateString("en-IN", {
                                    day: "2-digit", month: "long", year: "numeric",
                                })}
                            </span>
                        </div>
                    )}

                    {user.total_bookings !== undefined && (
                        <div className="profile-row">
                            <span className="profile-row-label">Total bookings</span>
                            <span className="profile-row-value">{user.total_bookings}</span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ProfilePage;
