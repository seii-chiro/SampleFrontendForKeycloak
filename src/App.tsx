import { useState } from "react";
import "./App.css";
import AuthenticatedView from "./AuthenticatedView";
import { BASE_URL } from "./utils";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      alert("Login failed. Please check your credentials.");
      throw new Error("Login failed");
    }

    localStorage.setItem("access_token", (await res.json()).access_token);
    setIsAuthenticated(true);
  };

  return (
    <div className="login-container">
      {isAuthenticated ? (
        <AuthenticatedView />
      ) : (
        <div className="login-box" role="region" aria-label="Login form">
          <h2>Welcome back</h2>
          <p className="subtitle">Sign in to continue to your account</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="you@example.com"
                autoComplete="username"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!username.trim() || !password}
            >
              Sign in
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
