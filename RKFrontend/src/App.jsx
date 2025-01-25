

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './pages/@protect/ProtectedRoute';
import Login from "./auth/login";
import Register from "./auth/register";
import Dashboard from "./pages/dashboard";



function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      {/* Protect these routes 
      <Route
        path="/dashboard"
        element={<ProtectedRoute element={<Login />} />}
      />
      */}
    </Routes>
    </Router>
  );
}

export default App;
