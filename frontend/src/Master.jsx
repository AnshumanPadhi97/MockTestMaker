import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import QuestionsMaker from "./components/QuestionsMaker";
import TestTaker from "./components/TestTaker";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import { useState } from "react";

function Master() {
  const [user, setUser] = useState(null);
  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
    return children;
  };
  return (
    <Router>
      {user && <Navigation user={user} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/create-test"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <QuestionsMaker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test/:testId"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <TestTaker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <Navigate
              to={user ? `/${user.role}/dashboard` : "/login"}
              replace
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default Master;
