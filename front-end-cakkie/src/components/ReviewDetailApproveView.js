import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory, commentTemplates } from '../data/productsData'; // Import dữ liệu tĩnh
import '../css/ReviewDetailView.css'; // Import file CSS

const itemsPerPage = 4; // Hiển thị tối đa 6 bình luận mỗi trang

function ReviewDetailApproveView() {
  const { category, productName, username } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Lấy sản phẩm dựa trên category và tên sản phẩm
  const products = productsByCategory[category.toLowerCase()] || [];
  const product = products.find(prod => prod.name === decodeURIComponent(productName));

  if (!product) {
    return <div>Error: Product not found!</div>;
  }

  // Lọc bình luận của user cụ thể và nhân bản dựa trên quantity
  const userComments = product.approveComments
    .filter(comment => comment.username === username)
    .flatMap(comment => Array(comment.quantity).fill(comment)); // Nhân số lượng bình luận dựa trên quantity

  if (userComments.length === 0) {
    return <div>No comments found for user: {username}</div>;
  }

  // Hàm sinh số lượng sao ngẫu nhiên (từ 4 đến 5)
  const generateRandomStars = () => {
    return Math.floor(Math.random() * 2) + 4; // Random từ 4 đến 5 sao
  };

  // Hàm sinh comment ngẫu nhiên từ commentTemplates.approve
  const generateRandomComment = () => {
    const randomComment = commentTemplates.approve[Math.floor(Math.random() * commentTemplates.approve.length)];
    return randomComment;
  };

  // Pagination logic
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedComments = userComments.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(userComments.length / itemsPerPage);

  // Render comments với chi tiết bình luận, không có hình ảnh sản phẩm
  const renderComments = () => {
    return (
      <div className="comment-grid">
        {paginatedComments.map((comment, index) => {
          const randomComment = generateRandomComment(); // Lấy bình luận ngẫu nhiên từ commentTemplates
          return (
            <div key={index} className="compact-comment-card">  {/* Thẻ bình luận */}
              <div className="comment-details">  {/* Wrap các chi tiết bình luận */}
                <p><strong>Star rating:</strong> {'⭐'.repeat(generateRandomStars())}</p> {/* Hiển thị ngôi sao từ 4 đến 5 sao */}
                <p><strong>Flavor(customer selected flavor):</strong> {randomComment.flavor}</p> {/* Bình luận mẫu từ commentTemplates */}
                <p><strong>Product quality:</strong> {randomComment.quality}</p> {/* Bình luận mẫu từ commentTemplates */}
                <p><strong>Packaging:</strong> {randomComment.packaging}</p> {/* Bình luận mẫu từ commentTemplates */}
                <p><strong>User Comment:</strong> {comment.comment}</p> {/* Comment gốc */}
              </div>
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

      {/* Điều khiển phân trang */}
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

export default ReviewDetailApproveView;
