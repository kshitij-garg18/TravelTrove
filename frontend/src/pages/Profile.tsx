import React from "react";
import { useAuth } from "../context/AuthContext";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2>Profile</h2>
      {user ? (
        <div className="form">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Please login to see your profile.</p>
      )}
    </div>
  );
};

export default Profile;
