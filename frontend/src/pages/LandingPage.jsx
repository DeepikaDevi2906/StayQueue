import { useNavigate } from "react-router-dom";

const DESTINATIONS = [
    { name: "Mumbai",    emoji: "🌊", color: "#0EA5E9", sub: "120+ hotels"   },
    { name: "Goa",       emoji: "🏖️", color: "#F59E0B", sub: "80+ resorts"   },
    { name: "Delhi",     emoji: "🏛️",  color: "#8B5CF6", sub: "200+ stays"   },
    { name: "Manali",    emoji: "🏔️",  color: "#10B981", sub: "45+ cabins"   },
    { name: "Jaipur",    emoji: "🏰",  color: "#F43F5E", sub: "90+ heritage" },
    { name: "Bangalore", emoji: "🌿",  color: "#6366F1", sub: "150+ hotels"  },
];

const FEATURES = [
    {
        icon: "🔒",
        bg:   "linear-gradient(135deg,#EDE9FE,#DDD6FE)",
        title: "Instant confirmation",
        body:  "Distributed locking prevents double-booking. Your room is secured the moment you pay.",
    },
    {
        icon: "✉️",
        bg:   "linear-gradient(135deg,#FEF3C7,#FDE68A)",
        title: "Automatic emails",
        body:  "Confirmation emails fire via RabbitMQ within seconds of booking.",
    },
    {
        icon: "⚡",
        bg:   "linear-gradient(135deg,#ECFDF5,#A7F3D0)",
        title: "Lightning fast",
        body:  "Redis caching means hotel listings load instantly, no matter the traffic.",
    },
];

function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="landing-root">

            {/* ── Nav ── */}
            <nav className="landing-nav">
                <div className="landing-nav-brand">
                    <span className="landing-brand-dot" />
                    StayQueue
                </div>
                <div className="landing-nav-actions">
                    <button className="landing-btn-ghost" onClick={() => navigate("/login")}>
                        Sign in
                    </button>
                    <button className="landing-btn-solid" onClick={() => navigate("/register")}>
                        Get started →
                    </button>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section className="landing-hero">
                <div className="hero-content">

                    <div className="hero-pill">🌏 Discover · Book · Explore</div>

                    <h1 className="hero-heading">
                        Your next stay,<br />
                        <span className="hero-heading-gradient">perfectly placed</span>
                    </h1>

                    <p className="hero-sub">
                        Thousands of hotels from mountain cabins to ocean resorts —
                        all bookable in seconds with real-time confirmation.
                    </p>

                    <div className="hero-search">
                        <div className="hero-search-inner">
                            <span className="hero-search-icon">📍</span>
                            <input
                                className="hero-search-input"
                                placeholder="Where are you going?"
                                onFocus={() => navigate("/login")}
                                readOnly
                            />
                            <button className="hero-search-btn" onClick={() => navigate("/login")}>
                                Search
                            </button>
                        </div>
                    </div>

                    <div className="hero-stats">
                        <div className="hero-stat"><strong>2,400+</strong><span>Hotels</span></div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat"><strong>180+</strong><span>Cities</span></div>
                        <div className="hero-stat-divider" />
                        <div className="hero-stat"><strong>98%</strong><span>On-time delivery</span></div>
                    </div>

                </div>

                {/* Floating image collage */}
                <div className="hero-collage" aria-hidden="true">
                    <div className="collage-card collage-card-1">
                        <div className="collage-img" style={{ background: "linear-gradient(135deg,#FDE68A,#F59E0B)" }}>🏖️</div>
                        <div className="collage-label">
                            <strong>Beachfront Villa</strong>
                            <span>Goa, India</span>
                        </div>
                    </div>
                    <div className="collage-card collage-card-2">
                        <div className="collage-img" style={{ background: "linear-gradient(135deg,#DDD6FE,#8B5CF6)" }}>🏰</div>
                        <div className="collage-label">
                            <strong>Heritage Palace</strong>
                            <span>Jaipur, India</span>
                        </div>
                    </div>
                    <div className="collage-card collage-card-3">
                        <div className="collage-img" style={{ background: "linear-gradient(135deg,#A7F3D0,#10B981)" }}>🏔️</div>
                        <div className="collage-label">
                            <strong>Mountain Cabin</strong>
                            <span>Manali, India</span>
                        </div>
                    </div>
                    <div className="collage-badge">
                        <span className="badge-pulse" />
                        Booking confirmed ✓
                    </div>
                </div>
            </section>

            {/* ── Destinations ── */}
            <section className="landing-section">
                <div className="section-header">
                    <h2>Popular destinations</h2>
                    <p>Handpicked stays across India's most vibrant cities</p>
                </div>
                <div className="dest-grid">
                    {DESTINATIONS.map((d) => (
                        <button
                            key={d.name}
                            className="dest-card"
                            onClick={() => navigate("/login")}
                            style={{ "--dest-color": d.color }}
                        >
                            <div className="dest-img" style={{ background: `linear-gradient(135deg,${d.color}22,${d.color}55)` }}>
                                <span className="dest-emoji">{d.emoji}</span>
                            </div>
                            <div className="dest-body">
                                <strong>{d.name}</strong>
                                <span>{d.sub}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </section>

            {/* ── Features ── */}
            <section className="landing-section landing-section-tinted">
                <div className="section-header">
                    <h2>Built for reliability</h2>
                    <p>Powered by microservices — so everything just works</p>
                </div>
                <div className="features-grid">
                    {FEATURES.map((f) => (
                        <div key={f.title} className="feature-card">
                            <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="landing-cta">
                <div className="cta-inner">
                    <h2>Ready to find your stay?</h2>
                    <p>Join thousands of travellers booking smarter with StayQueue.</p>
                    <div className="cta-actions">
                        <button className="landing-btn-solid landing-btn-lg" onClick={() => navigate("/register")}>
                            Create free account
                        </button>
                        <button className="landing-btn-outline landing-btn-lg" onClick={() => navigate("/login")}>
                            Sign in
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="landing-footer">
                <div className="footer-brand">
                    <span className="landing-brand-dot" />
                    StayQueue
                </div>
                <p>© 2026 StayQueue · Distributed Hotel Booking Platform</p>
            </footer>

        </div>
    );
}

export default LandingPage;
