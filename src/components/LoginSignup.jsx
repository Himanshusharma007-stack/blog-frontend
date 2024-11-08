import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../services/User";
import localStorageFunctions from "../utils/localStorageFunctions.js";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token") || null;
    if (token) {
      // Redirect to homepage if token exists
      navigate("/userBlogs");
    }
  }, [navigate]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear error on form switch
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error

    try {
      if (isLogin) {
        const loginResponse = await loginUser({ email, password });
        console.log("Login successful:", loginResponse);
        // Save token and user data to localStorage
        localStorageFunctions.saveInLocalstorage("token", loginResponse.token);
        localStorageFunctions.saveInLocalstorage(
          "user",
          JSON.stringify(loginResponse.user)
        );
      } else {
        const signupResponse = await signupUser({ username, email, password });
        console.log("Signup successful:", signupResponse);
        // Save token and user data to localStorage
        localStorageFunctions.saveInLocalstorage("token", signupResponse.token);
        localStorageFunctions.saveInLocalstorage(
          "user",
          JSON.stringify(signupResponse.user)
        );
      }
      // Redirect to homepage after successful login/signup
      navigate("/userBlogs");
    } catch (err) {
      setError(err.msg || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h5" textAlign="center" mb={2}>
        {isLogin ? "Login" : "Sign Up"}
      </Typography>

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : isLogin ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>

        {error && (
          <Typography variant="body2" color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        <Button fullWidth variant="text" sx={{ mt: 2 }} onClick={toggleForm}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </Button>
      </form>
    </Box>
  );
}
