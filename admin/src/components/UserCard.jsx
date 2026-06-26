import { Link } from "react-router-dom";

const initials = (name = "") =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const UserCard = ({ user }) => {
  return (
    <div className="user-cell">
      <div className="user-initials">{initials(user.name || user.email)}</div>
      <div>
        <div className="user-name">{user.name || "—"}</div>
        <div className="user-email">{user.email}</div>
      </div>
    </div>
  );
};

export default UserCard;
