import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function RegisterPage() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setErrorMessage("");
            setLoading(true);

            await API.post(
                "/users/register",
                {
                    name,
                    email,
                    password
                }
            );

            navigate("/");

        } catch (error) {

            setErrorMessage(
                error.response?.data?.detail ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="auth-card">

            <h2>Create your account</h2>

            <form onSubmit={handleSubmit}>

                {
                    errorMessage && (
                        <p className="form-error">
                            {errorMessage}
                        </p>
                    )
                }

                <div className="form-group">

                    <label>Name</label>

                    <input
                        type="text"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                </div>

                <div className="form-group">

                    <label>Password</label>

                    <input
                        type="password"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Create account"}
                </button>

            </form>

            <p>
                Already have an account?{" "}
                <Link to="/">
                    Sign in
                </Link>
            </p>

        </div>
    );
}

export default RegisterPage;