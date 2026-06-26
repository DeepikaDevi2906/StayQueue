import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/UsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import HotelsPage from "./pages/HotelsPage";
import CreateHotelPage from "./pages/CreateHotelPage";
import ActivityLogsPage from "./pages/ActivityLogsPage";
import "./main.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<AdminDashboard />} />
        <Route path="/users"          element={<UsersPage />} />
        <Route path="/users/:userId"  element={<UserDetailsPage />} />
        <Route path="/hotels"         element={<HotelsPage />} />
        <Route path="/hotels/create"  element={<CreateHotelPage />} />
        <Route path="/activities"     element={<ActivityLogsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
