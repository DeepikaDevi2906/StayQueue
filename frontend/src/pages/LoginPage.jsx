import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function LoginPage() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setErrorMessage("");
            setLoading(true);

            const response = await API.post(
                "/users/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            navigate("/hotels");

        } catch (error) {

            setErrorMessage(
                error.response?.data?.detail ||
                "Invalid email or password"
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="auth-card">

            <h2>Welcome back</h2>

            <form onSubmit={handleSubmit}>

                {
                    errorMessage && (
                        <p className="form-error">
                            {errorMessage}
                        </p>
                    )
                }

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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

            </form>

            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    Create one
                </Link>
            </p>

        </div>
    );
}

export default LoginPage;