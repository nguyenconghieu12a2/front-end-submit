import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory } from '../data/productsData';
import '../css/ProductDetailView.css';

const itemsPerPage = 10;

function ProductDetailApproveView() {
  const { category, productName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [approveCommentsData, setApproveCommentsData] = useState([]); 
  const [uniqueUsernamesData, setUniqueUsernamesData] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const products = productsByCategory[category.toLowerCase()] || [];
    const product = products.find(prod => prod.name === decodeURIComponent(productName));

    if (!product) return;

    const totalQuantityByUser = product.approveComments.reduce((acc, comment) => {
      acc[comment.username] = (acc[comment.username] || 0) + comment.quantity;
      return acc;
    }, {});

    const uniqueUsernames = Object.keys(totalQuantityByUser);

    setApproveCommentsData(product.approveComments);
    setUniqueUsernamesData(uniqueUsernames);
  }, [category, productName]);

  const totalQuantityByUser = approveCommentsData.reduce((acc, comment) => {
    acc[comment.username] = (acc[comment.username] || 0) + comment.quantity;
    return acc;
  }, {});

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsernames = uniqueUsernamesData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(uniqueUsernamesData.length / itemsPerPage);

  const handleNavigate = (username) => {
    navigate(`/review-approve/${category}/${productName}/${username}`);
  };

  // Tính tổng số comment
  const calculateTotalComments = () => {
    return approveCommentsData.reduce((total, comment) => total + comment.quantity, 0);
  };

  const renderComments = () => (
    <table className="product-detail-table">
      <thead>
        <tr>
          <th>No.</th>
          <th>Username</th>
          <th>Total Quantity</th>
          <th>Comment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {paginatedUsernames.map((username, index) => {
          const sampleComment = approveCommentsData.find(c => c.username === username);
          return (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              <td>{username}</td>
              <td>{totalQuantityByUser[username]}</td>
              <td>{sampleComment.comment}</td>
              <td>
                <span className="view-detail-link" onClick={() => handleNavigate(username)}>
                  View Detail
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  return (
    <div className="product-detail-view">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h2>View list approve review</h2>
      <p className="product-name">Product Name: {decodeURIComponent(productName)}</p>
      <p>Total Comments: {calculateTotalComments()}</p> {/* Hiển thị tổng số comment */}
      {renderComments()}
      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          {'<<'}
        </button>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          {'>>'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailApproveView;
