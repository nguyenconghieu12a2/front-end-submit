import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory } from '../data/productsData';
import '../css/ProductDetailView.css';

const itemsPerPage = 10;

function ProductDetailPendingView() {
  const { category, productName } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [pendingCommentsData, setPendingCommentsData] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const products = productsByCategory[category.toLowerCase()] || [];
    const product = products.find(prod => prod.name === decodeURIComponent(productName));

    if (!product) return;

    // No need for uniqueUsernamesData
    setPendingCommentsData(product.pendingComments);
  }, [category, productName]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedComments = pendingCommentsData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(pendingCommentsData.length / itemsPerPage);

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
        {paginatedComments.map((comment, index) => (
          <tr key={index}>
            <td>{startIndex + index + 1}</td>
            <td>{comment.username}</td>
            <td>{comment.quantity}</td>
            <td>{comment.comment}</td>
            <td>
              <span className="view-detail-link" onClick={() => navigate(`/review-pending/${category}/${productName}/${comment.username}`)}>
                View Detail
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="product-detail-view">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h2>View list pending review</h2>
      <p className="product-name">Product Name: {decodeURIComponent(productName)}</p>
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

export default ProductDetailPendingView;
