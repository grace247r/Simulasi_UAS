import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(email, password);
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
        <h2 style={styles.title}>Login</h2>

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

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Login
        </button>

        <p style={styles.link}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
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

export default Login;
