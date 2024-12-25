

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './pages/@protect/ProtectedRoute';
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./pages/dashboard";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protect these routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Dashboard />} />}
      />
      
    </Routes>
    </Router>
  );
}

export default App;
