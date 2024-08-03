// src/App.tsx

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./login";
import UserDashboard from "./user";
import AdminDashboard from "./admin";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from "./firebaseAuth";


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(
    null
  );
  // const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        // Additional logic to check if the user is an admin can be added here
        // For example, checking a custom claim or a specific field in the user profile
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Optionally show a loading spinner
  }

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-dashboard"
          element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin-dashboard"
          element={
           
              <AdminDashboard />
          
          }
        />
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
};

export default App;
