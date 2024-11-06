import React, { useState } from 'react'; // Removed useEffect and commentTemplates
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory } from '../data/productsData'; // Import static data
import '../css/ReviewDetailView.css'; // Import CSS

const itemsPerPage = 4; // Display a maximum of 4 comments per page

function ReviewDetailPendingView() {
  const { category, productName, username } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Get product by category and product name
  const products = productsByCategory[category.toLowerCase()] || [];
  const product = products.find(prod => prod.name === decodeURIComponent(productName));

  if (!product) {
    return <div>Error: Product not found!</div>;
  }

  // Filter and replicate comments based on quantity
  const userComments = product.pendingComments
    .filter(comment => comment.username === username)
    .flatMap(comment => Array(comment.quantity).fill(comment)); // Multiply by quantity

  if (userComments.length === 0) {
    return <div>No comments found for user: {username}</div>;
  }

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedComments = userComments.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(userComments.length / itemsPerPage);

  // Generate random star rating (1 to 5 stars)
  const generateRandomStars = () => {
    return Math.floor(Math.random() * 5) + 1; // Random from 1 to 5 stars
  };

  // Render comments with random stars and action buttons
  const renderComments = () => {
    return (
      <div className="comment-grid">
        {paginatedComments.map((comment, index) => {
          return (
            <div key={index} className="compact-comment-card">
              <div className="comment-details">
                <p><strong>Star rating:</strong> {'⭐'.repeat(generateRandomStars())}</p>
                <p><strong>Flavor(customer selected flavor):</strong> {comment.flavor}</p>
                <p><strong>Product quality:</strong> {comment.quality}</p>
                <p><strong>Packaging:</strong> {comment.packaging}</p>
                <p><strong>User Comment:</strong> {comment.comment}</p>
              </div>
              <div className="action-buttons">
                <button className="approve-button">Approve</button>
                <button className="reject-button">Reject</button>
              </div>
              <hr className="comment-divider" />
            </div>
          );
        })}
      </div>
    );
  };

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

export default ReviewDetailPendingView;
