import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import OtpVerification from './OtpVerification';
import ResetPassword from './ResetPassword';
import Profile from './Profile';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import Header from './components/Header';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import { FlowProvider, useFlow } from "./components/admin-login/Flow";
import "./App.css";
// LOGIN PAGE
import AdminLogin from "./components/admin-login/admin-login";
import ResetPasswordEmail from "./components/admin-login/reset-password-email";
import NewPassword from "./components/admin-login/new-password";
import OTPEmail from "./components/admin-login/otp-email";
//DASHBOARD
import Dashboard from "./components/dashboard/dashboard";
//BANNERS
import AdminBanner from "./components/admin-banners/admin-banner";
import AddBanner from "./components/admin-banners/admin-add-banner";
import EditBanner from "./components/admin-banners/admin-edit-banner";
//ADMIN PROFILES
import AdminProfile from "./components/admin-profile/manage-profile";
import EditProfile from "./components/admin-profile/edit-profile";
import ChangePassword from "./components/admin-profile/change-password";
//CUSTOMERS
import ManageCustomer from "./components/customers/admin-manage-customer";
import BannedCustomer from "./components/customers/admin-banned-customer";
import DeletedCustomer from "./components/customers/admin-deleted-customer";
import DetailCustomer from "./components/customers/admin-detail-customer";
import DetailBannedCustomer from "./components/customers/admin-detail-banned-customer";
import EditCustomer from "./components/customers/admin-edit-customer";
//REPORTS (X2)
import Reports from "./components/reports/admin-report";
import Statistic from "./components/statistic/admin-statistic";
//OTHERS
import Header from "./components/header/admin-header";
import FourOhFour from "./components/not-found/not-found";

const ProtectedRoute = ({ allowedStep, element }) => {
  const { flowStep } = useFlow();
  return flowStep === allowedStep ? element : <Navigate to="/admin-reset-email" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!(localStorage.getItem('jwt') || sessionStorage.getItem('jwt'));
  });

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  });

  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    sessionStorage.removeItem('jwt');
  };

  return (
    <Router>
      <FlowProvider>
      <div className="d-flex flex-column min-vh-100">
        <Header isLoggedIn={isLoggedIn} user={user} />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<OtpVerification />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />

            {/* LOGIN PAGE */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin-reset-email" element={<ResetPasswordEmail />} />
            <Route
              path="/admin-reset-otp"
              element={<ProtectedRoute allowedStep="otp" element={<OTPEmail />} />}
            />
            <Route
              path="/admin-reset-password"
              element={<ProtectedRoute allowedStep="new-password" element={<NewPassword />} />}
            />
          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* BANNERS */}
          <Route path="/banners" element={<AdminBanner />} />
          <Route path="/add-banners" element={<AddBanner />} />
          <Route path="/edit-banners" element={<EditBanner />} />

          {/* ADMIN PROFILES */}
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/admin-profile/edit" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* CUSTOMERS */}
          <Route path="/customers" element={<ManageCustomer />} />
          <Route path="/banned-customers" element={<BannedCustomer />} />
          <Route
            path="/banned-customers/detail/:id"
            element={<DetailBannedCustomer />}
          />
          <Route path="/deleted-customers" element={<DeletedCustomer />} />
          <Route path="/customers/detail/:id" element={<DetailCustomer />} />
          <Route path="/customers/edit/:id" element={<EditCustomer />} />

          {/* REPORTS (X2) */}
          <Route path="/reports" element={<Reports />}/>
          <Route path="/statistics" element={<Statistic />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<FourOhFour />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </FlowProvider>
    </Router>
  )};


export default App;
