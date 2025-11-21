import Keycloak from "keycloak-js";
import { BASE_URL } from "./utils";
import { useState } from "react";

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

const App = () => {
  const [sampleTestResponse, setSampleTestResponse] = useState<string>("");

  const handleTestRequest = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/test/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${kc.token}`,
        },
      });

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
    <div>
      <h1>Welcome</h1>

      <button onClick={handleTestRequest}>Test Request to DRF API</button>

      {sampleTestResponse && <p>{JSON.stringify(sampleTestResponse)}</p>}
    </div>
  );
};

export default App;
