import React from "react";
import { BASE_URL } from "./utils";

const AuthenticatedView: React.FC = () => {
  const access_token = localStorage.getItem("access_token");

  const handleTest = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/test/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (!res.ok) {
        alert("Test request failed.");
        return;
      }
      alert("Test request succeeded.");
    } catch {
      alert("Test request failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome</h1>
        <p className="auth-subtitle">You are signed in to the demo app.</p>

        <div className="auth-actions">
          <button className="auth-button" onClick={handleTest}>
            Run Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedView;
