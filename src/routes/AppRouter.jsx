import { Navigate, Route, Routes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Rooms from "../pages/Rooms/Rooms";
import Housekeeping from "../pages/Housekeeping/Housekeeping";
import Staff from "../pages/Staff/Staff";
import Reports from "../pages/Reports/Reports";
import Reservations from "../pages/Reservations/Reservations";
import Settings from "../pages/Settings/Settings";
import Guests from "../pages/Guests/guests";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
            <Route path="/guests" element={<Guests />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/housekeeping" element={<Housekeeping />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default AppRouter;