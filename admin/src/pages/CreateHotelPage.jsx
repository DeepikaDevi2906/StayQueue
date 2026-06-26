import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";

const CreateHotelPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:        "",
    city:        "",
    description: "",
    rating:      "",
    total_rooms: "",
    price_per_night: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [success, setSuccess] = useState("");

  const set = (field) => (e) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.city.trim()) {
      setError("Hotel name and city are required.");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("admin_token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const payload = {
      name:            form.name.trim(),
      city:            form.city.trim(),
      description:     form.description.trim() || undefined,
      rating:          form.rating       ? parseFloat(form.rating)      : undefined,
      total_rooms:     form.total_rooms  ? parseInt(form.total_rooms)   : undefined,
      price_per_night: form.price_per_night ? parseFloat(form.price_per_night) : undefined,
    };

    try {
      const r = await fetch("http://localhost:8000/hotels", {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        throw new Error(data?.detail || `Server error (${r.status})`);
      }

      setSuccess("Hotel created successfully!");
      setTimeout(() => navigate("/hotels"), 1200);
    } catch (err) {
      setError(err.message || "Failed to create hotel.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Create Hotel">

      <div className="page-header-row">
        <h1>Create Hotel</h1>
        <Link to="/hotels" className="btn btn-secondary">← Back</Link>
      </div>

      {error   && <div className="form-error-msg" style={{ marginBottom: 20 }}>⚠️ {error}</div>}
      {success && (
        <div
          className="form-error-msg"
          style={{ marginBottom: 20, background: "var(--green-bg)", color: "var(--green)", borderColor: "#6EE7B7" }}
        >
          ✓ {success}
        </div>
      )}

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="form-section-title">Basic Information</div>

          <div className="form-row">
            <div className="form-group">
              <label>Hotel Name *</label>
              <input
                placeholder="e.g. The Grand Palace"
                value={form.name}
                onChange={set("name")}
                required
              />
            </div>
            <div className="form-group">
              <label>City *</label>
              <input
                placeholder="e.g. Mumbai"
                value={form.city}
                onChange={set("city")}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              placeholder="Brief description of the property…"
              value={form.description}
              onChange={set("description")}
            />
          </div>
        </div>

        <div className="form-section">
          <div className="form-section-title">Details</div>

          <div className="form-row">
            <div className="form-group">
              <label>Total Rooms</label>
              <input
                type="number"
                placeholder="e.g. 120"
                min="1"
                value={form.total_rooms}
                onChange={set("total_rooms")}
              />
            </div>
            <div className="form-group">
              <label>Price per Night (₹)</label>
              <input
                type="number"
                placeholder="e.g. 3500"
                min="0"
                step="0.01"
                value={form.price_per_night}
                onChange={set("price_per_night")}
              />
            </div>
          </div>

          <div className="form-group" style={{ maxWidth: 200 }}>
            <label>Star Rating</label>
            <input
              type="number"
              placeholder="1 – 5"
              min="1"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={set("rating")}
            />
            <div className="form-hint">Leave blank if not rated</div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "auto" }}>
            {loading ? "Creating…" : "Create Hotel"}
          </button>
          <Link to="/hotels" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>

    </AdminLayout>
  );
};

export default CreateHotelPage;
