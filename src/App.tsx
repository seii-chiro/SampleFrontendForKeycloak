import Keycloak from "keycloak-js";
import { BASE_URL } from "./utils";
import { useState } from "react";
import "./App.css";

const kc = new Keycloak({
  url: "http://myapp.local:8080",
  realm: "dev_deployment",
  clientId: "frontend-app",
});

kc.init({
  onLoad: "login-required",
  checkLoginIframe: true,
  pkceMethod: "S256",
}).then(
  (auth) => {
    if (!auth) {
      window.location.reload();
    } else {
      /* Remove below logs if you are using this on production */
      console.info("Authenticated");
      console.log("auth", auth);
      console.log("Keycloak", kc);
      console.log("Access Token", kc.token);

      kc.onTokenExpired = () => {
        console.log("token expired");
      };
    }
  },
  () => {
    /* Notify the user if necessary */
    console.error("Authentication Failed");
  }
);

export interface TestRequest {
  user: string;
  roles: string[];
  first_name: string;
  family_name: string;
  email: string;
}

const App = () => {
  const [sampleTestResponse, setSampleTestResponse] =
    useState<TestRequest | null>(null);

  const handleTestRequest = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/test/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${kc.token}`,
        },
      });

      if (res.status === 403) {
        window.location.reload();
      }

      if (!res.ok) {
        console.log("Failed to fetch.");
        throw new Error("Failed to fetch!");
      }

      const data = await res.json();
      setSampleTestResponse(data);
    } catch (error) {
      console.error("Error during test request:", error);
    }
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome</h1>
        <p className="subtitle">You're successfully authenticated</p>

        <div className="info-card">
          <div className="info-item">
            <span className="label">Status</span>
            <span className="value status-connected">Connected</span>
          </div>
          <div className="info-item">
            <span className="label">Realm</span>
            <span className="value">dev_deployment</span>
          </div>
        </div>

        <div className="api-test-section">
          <h2>API Test</h2>
          <button className="test-button" onClick={handleTestRequest}>
            Test Request to DRF API
          </button>
          {sampleTestResponse && (
            <pre className="response-box">
              {JSON.stringify(sampleTestResponse, null, 2)}
            </pre>
          )}
        </div>

        <button className="logout-button" onClick={() => kc.logout()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default App;
