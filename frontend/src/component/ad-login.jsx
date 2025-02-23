import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext"; // Import AuthContext
import axios from "axios"; // Import axios for API calls
import "../styles/login.css";
import { loginAdmin } from "../api/lotteryApi";

const ADM = () => {
  const { login } = useContext(AuthContext); // Use AuthContext for login
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAdmin({
        username: email,
        password: password,
      });

      if (response.status === 200) {
        login(); // Set user as authenticated
        navigate("/admin"); // Redirect to admin navbar
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="admLogin">
      <div className="logo">
        <img src="dplogo.png" alt="Logo" style={{ width: "200px", height: "auto" }} />
      </div>

      <div className="form">
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>
          <div className="password">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default ADM;

