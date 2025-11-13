import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(username, password);
      console.log(res.data);
      alert("Login successful!");
      navigate("/homepage");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Logo / Title */}
        <h1 style={styles.logo}>EcoShop 🌿</h1>
        <h2 style={styles.title}>Welcome Back</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {/* Error message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Button */}
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#276749")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2f855a")}
        >
          Login
        </button>

        {/* Link */}
        <p style={styles.link}>
          Don’t have an account?{" "}
          <Link to="/signup" style={styles.signupLink}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #68d391 0%, #38a169 100%)",
    fontFamily: "'Poppins', sans-serif",
    animation: "fadeIn 1s ease-in-out",
  },
  form: {
    background: "white",
    padding: 40,
    borderRadius: 20,
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    width: 360,
    maxWidth: "90%",
    animation: "slideUp 0.8s ease-in-out",
  },
  logo: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#2f855a",
    marginBottom: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 20,
    fontWeight: "600",
    color: "#4a5568",
  },
  input: {
    marginBottom: 18,
    padding: 14,
    fontSize: 15,
    border: "2px solid #e2e8f0",
    borderRadius: 10,
    transition: "all 0.3s ease",
    outline: "none",
  },
  button: {
    backgroundColor: "#2f855a",
    color: "white",
    padding: 14,
    fontSize: 16,
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "bold",
    marginTop: 5,
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#4a5568",
    fontSize: 14,
  },
  signupLink: {
    color: "#2f855a",
    textDecoration: "none",
    fontWeight: "600",
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    backgroundColor: "#fef2f2",
    padding: 10,
    borderRadius: 5,
    border: "1px solid #fecaca",
  },
};

export default Login;
