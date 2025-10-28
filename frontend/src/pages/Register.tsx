import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    // Temporary: register acts like login
    login({ id: email, name: name || "User", email });
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Register (temporary)</h2>
      <div className="form">
        <form onSubmit={handle}>
          <input required type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
