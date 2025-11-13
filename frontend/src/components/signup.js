import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/auth";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await signupUser(name, email, password);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setMessage("Signup failed. Try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        <p style={styles.link}>
          Already have an account? <Link to="/">Login</Link>
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
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  form: {
    background: "white",
    padding: 40,
    borderRadius: 15,
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    width: 350,
    maxWidth: "90%",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    marginBottom: 20,
    padding: 15,
    fontSize: 16,
    border: "2px solid #e1e5e9",
    borderRadius: 8,
    transition: "border-color 0.3s ease",
    outline: "none",
  },
  button: {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: 15,
    fontSize: 16,
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#666",
    fontSize: 14,
  },
  error: {
    color: "#e74c3c",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
    backgroundColor: "#fdf2f2",
    padding: 10,
    borderRadius: 5,
    border: "1px solid #f5c6cb",
  },
};

export default Signup;
