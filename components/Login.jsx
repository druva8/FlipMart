import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css"; // Assuming you have a CSS file for styles

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z][\w\.-]*@(gmail\.com|email\.com)$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!validateEmail(email)) {
      setError(
        "Email must start with a letter and end with @gmail.com or @email.com"
      );
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    // Directly navigate to Productscard after validation
    setMessage("Login successful! Redirecting...");
    navigate("/Home");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <div className="auth-form">
          <form onSubmit={handleSubmit} className="form-centered">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="input-icon toggle-icon"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            {message && <p className="message">{message}</p>}
            {error && (
              <p className="message" style={{ color: "#721c24" }}>
                {error}
              </p>
            )}
          </form>
          <div className="auth-link">
            <button
              onClick={() => navigate("/forgot-password")}
              className="link"
            >
              Forgot Password
            </button>
          </div>
          <p className="auth-link">
            Don't have an account?{" "}
            <button onClick={() => navigate("/signup")} className="link">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
