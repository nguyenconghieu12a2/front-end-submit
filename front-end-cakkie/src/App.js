import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReviewManagement from './components/ReviewManagement';
import ApproveView from './components/ApproveView';
import RejectView from './components/RejectView';
import PendingView from './components/PendingView';
import ProductDetailApproveView from './components/ProductDetailApproveView';
import ProductDetailRejectView from './components/ProductDetailRejectView';
import ProductDetailPendingView from './components/ProductDetailPendingView';
import ReviewDetailApproveView from './components/ReviewDetailApproveView';
import ReviewDetailRejectView from './components/ReviewDetailRejectView';
import ReviewDetailPendingView from './components/ReviewDetailPendingView';
import Sidebar from './components/Sidebar'
import './App.css'; // Assuming you have some global styles

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar /> {/* Sidebar will always be present */}
        <div className="content">
          <Routes>
            {/* Main route to manage reviews */}
            <Route path="/review-management" element={<ReviewManagement />} />

            {/* Routes for review approval flow */}
            <Route path="/approve/:category" element={<ApproveView />} />
            <Route
              path="/approve-management/:category/:productName"
              element={<ProductDetailApproveView />}
            />
            <Route
              path="/review-approve/:category/:productName/:username"
              element={<ReviewDetailApproveView />}
            />

            {/* Routes for review rejection flow */}
            <Route path="/reject/:category" element={<RejectView />} />
            <Route
              path="/reject-management/:category/:productName"
              element={<ProductDetailRejectView />}
            />
            <Route
              path="/review-reject/:category/:productName/:username"
              element={<ReviewDetailRejectView />}
            />

            {/* Routes for pending reviews */}
            <Route path="/pending/:category" element={<PendingView />} />
            <Route
              path="/pending-management/:category/:productName"
              element={<ProductDetailPendingView />}
            />
            <Route
              path="/review-pending/:category/:productName/:username"
              element={<ReviewDetailPendingView />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
