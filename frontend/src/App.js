import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage    from "./pages/LandingPage";
import LoginPage      from "./pages/LoginPage";
import RegisterPage   from "./pages/RegisterPage";
import HotelsPage     from "./pages/HotelsPage";
import BookingPage    from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import ProfilePage    from "./pages/ProfilePage";

import Sidebar from "./components/Sidebar";

import "./styles/main.css";

function Layout({ children }) {
    return (
        <div className="app-layout">
            <header className="topbar">
                <h2>StayQueue</h2>
            </header>
            <div className="main-layout">
                <Sidebar />
                <main className="content">
                    {children}
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/"            element={<LandingPage />} />
                <Route path="/login"       element={<LoginPage />} />
                <Route path="/register"    element={<RegisterPage />} />
                <Route path="/hotels"      element={<Layout><HotelsPage /></Layout>} />
                <Route path="/book/:hotelId" element={<Layout><BookingPage /></Layout>} />
                <Route path="/booking"     element={<Layout><BookingPage /></Layout>} />
                <Route path="/my-bookings" element={<Layout><MyBookingsPage /></Layout>} />
                <Route path="/profile"     element={<Layout><ProfilePage /></Layout>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
