import React from "react";
import Keycloak from "keycloak-js";
import { BASE_URL } from "../utils";

interface AuthenticatedPageProps {
  keycloak: Keycloak;
}

const AuthenticatedPage: React.FC<AuthenticatedPageProps> = ({ keycloak }) => {
  const handleTest = async () => {
    try {
      // Get the token from Keycloak, not localStorage
      const token = keycloak.token;

      if (!token) {
        alert("No token available. Please log in again.");
        keycloak.login();
        return;
      }

      const res = await fetch(`${BASE_URL}/api/test/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Test request failed.");
        return;
      }

      alert("Test request succeeded.");
    } catch (error) {
      console.error("Test request error:", error);
      alert("Test request failed.");
    }
  };

  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome</h1>
        <p className="auth-subtitle">You are signed in to the demo app.</p>
        <p>
          Logged in as: {keycloak.tokenParsed?.preferred_username || "User"}
        </p>
        <div className="auth-actions">
          <button className="auth-button" onClick={handleTest}>
            Run Test
          </button>
          <button className="auth-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatedPage;
