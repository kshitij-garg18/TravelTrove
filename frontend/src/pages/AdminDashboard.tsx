import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="AdminDashboard-page">
      <h2>AdminDashboard</h2>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">AdminDashboard</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
