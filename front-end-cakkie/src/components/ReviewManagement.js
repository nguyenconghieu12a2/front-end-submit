import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ReviewManagement.css';

function ReviewManagement() {
  const navigate = useNavigate();

  const handleApprove = (category) => {
    navigate(`/approve/${category}`);
  };

  const handleReject = (category) => {
    navigate(`/reject/${category}`);
  };

  const handlePending = (category) => {
    navigate(`/pending/${category}`);
  };

  return (
    <div className="review-management-view">
      <h2>Review Management</h2>

      <table className="review-management-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Product</th>
            <th>Product review status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Cake</td>
            <td>
              <button className="approve" onClick={() => handleApprove('cake')}>Approve</button>
              <button className="reject" onClick={() => handleReject('cake')}>Reject</button>
              <button className="pending" onClick={() => handlePending('cake')}>Pending</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Ingredients</td>
            <td>
              <button className="approve" onClick={() => handleApprove('ingredients')}>Approve</button>
              <button className="reject" onClick={() => handleReject('ingredients')}>Reject</button>
              <button className="pending" onClick={() => handlePending('ingredients')}>Pending</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Tools</td>
            <td>
              <button className="approve" onClick={() => handleApprove('tools')}>Approve</button>
              <button className="reject" onClick={() => handleReject('tools')}>Reject</button>
              <button className="pending" onClick={() => handlePending('tools')}>Pending</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReviewManagement;
