// src/components/Login.tsx

import React, { useState } from "react";
import { auth } from "./firebaseAuth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard or show success message
      alert("login");
      navigate("/user-dashboard");
        
      
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
