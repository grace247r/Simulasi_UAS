import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/auth";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await signupUser(name, username, email, password);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/* Logo */}
        <h1 style={styles.logo}>EcoShop 🌿</h1>
        <h2 style={styles.title}>Create Your Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {message && <p style={styles.error}>{message}</p>}

        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#276749")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#2f855a")}
        >
          Sign Up
        </button>

        <p style={styles.link}>
          Already have an account?{" "}
          <Link to="/" style={styles.loginLink}>
            Login
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
    animation: "fadeIn 0.8s ease-in-out",
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
  loginLink: {
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

export default Signup;
