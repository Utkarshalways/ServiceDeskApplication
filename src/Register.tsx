// src/components/Register.tsx

import React, { useState } from "react";
import { auth } from "./firebaseAuth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
      const navigate = useNavigate();
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard or show success message
      navigate('/user-dashboard');
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
          onClick={handleRegister}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
