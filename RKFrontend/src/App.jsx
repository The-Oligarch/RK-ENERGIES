

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './js/scripts.js';
import "./js/material.js";
import ProtectedRoute from './pages/@protect/ProtectedRoute';
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./pages/dashboard";



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/register" element={<Register />} />

      {/* Protect these routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Login />} />}
      />
      
    </Routes>
    </Router>
  );
}

export default App;
