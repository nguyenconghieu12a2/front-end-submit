import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory } from '../data/productsData'; // Import static data
import '../css/ReviewDetailView.css'; // Import CSS

const itemsPerPage = 4; // Display a maximum of 4 comments per page

function ReviewDetailRejectView() {
  const { category, productName, username } = useParams();
  const navigate = useNavigate();

  // Get product by category and product name
  const products = productsByCategory[category.toLowerCase()] || [];
  const product = products.find(prod => prod.name === decodeURIComponent(productName));

  // Initialize state to manage reject comments
  const initialComments = product
    ? product.rejectComments
        .filter(comment => comment.username === username)
        .flatMap(comment => Array(comment.quantity).fill({ ...comment }))
    : [];

  const [rejectComments, setRejectComments] = useState(initialComments);
  const [currentPage, setCurrentPage] = useState(1); // Initialize pagination state

  // If there are no reject comments, return a message (after hooks)
  if (!product) {
    return <div>Error: Product not found!</div>;
  }

  if (rejectComments.length === 0) {
    return <div>No comments found for user: {username}</div>;
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedComments = rejectComments.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(rejectComments.length / itemsPerPage);

  // Handle toxic action
  const handleToxic = (index) => {
    const toxicComment = rejectComments[index];
    setRejectComments(prevComments => {
      const updatedComments = [...prevComments];
      updatedComments.splice(index, 1); // Remove one instance of the comment
      product.toxicComments.push({ ...toxicComment, quantity: 1 }); // Move to toxicComments
      return updatedComments;
    });

    // Update the product's rejectComments quantity
    const commentInData = product.rejectComments.find(comment => comment.username === toxicComment.username);
    if (commentInData.quantity > 1) {
      commentInData.quantity -= 1;
    } else {
      product.rejectComments = product.rejectComments.filter(c => c !== commentInData);
    }
  };

  // Handle recover action
  const handleRecover = (index) => {
    const recoveredComment = rejectComments[index];
    setRejectComments(prevComments => {
      const updatedComments = [...prevComments];
      updatedComments.splice(index, 1); // Remove one instance of the comment
      product.pendingComments.push({ ...recoveredComment, quantity: 1 }); // Move to pendingComments
      return updatedComments;
    });

    // Update the product's rejectComments quantity
    const commentInData = product.rejectComments.find(comment => comment.username === recoveredComment.username);
    if (commentInData.quantity > 1) {
      commentInData.quantity -= 1;
    } else {
      product.rejectComments = product.rejectComments.filter(c => c !== commentInData);
    }
  };

  // Render comments with star rating
  const renderComments = () => (
    <div className="comment-grid">
      {paginatedComments.map((comment, index) => (
        <div key={index} className="compact-comment-card">
          <div className="comment-details">
            <p><strong>Star rating:</strong> {'⭐'.repeat(comment.rating || 1)}</p>
            <p><strong>Flavor:</strong> {comment.flavor}</p>
            <p><strong>Quality:</strong> {comment.quality}</p>
            <p><strong>Packaging:</strong> {comment.packaging}</p>
            <p><strong>User Comment:</strong> {comment.comment}</p>
          </div>
          <div className="action-buttons">
            <button className="toxic-button" onClick={() => handleToxic(index)}>Toxic</button>
            <button className="recover-button" onClick={() => handleRecover(index)}>Recover</button>
          </div>
          <hr className="comment-divider" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="review-detail-view">
      <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      <h2>User name: {username}</h2>

      {renderComments()}

      {/* Pagination Controls */}
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

export default ReviewDetailRejectView;
