import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory } from '../data/productsData'; // Import the data
import '../css/StatusView.css'; // Specific CSS for ApproveView

const itemsPerPage = 10;

function ApproveView() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products by category and set products state
    const categoryProducts = productsByCategory[category.toLowerCase()] || [];
    setProducts(categoryProducts);
  }, [category]);

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  // Tính tổng số comment dựa trên quantity
  const calculateTotalComments = (approveComments) => {
    return approveComments.reduce((total, comment) => total + comment.quantity, 0);
  };

  const handleProductClick = (productName) => {
    navigate(`/approve-management/${category}/${encodeURIComponent(productName)}`);
  };

  return (
    <div className="approve-view">
      <button className="back-button" onClick={() => navigate('/review-management')}>Back</button>
      <h2>Approve View({category})</h2>
      <input
        type="text"
        placeholder="Search products..."
        className="approve-search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredProducts.length > 0 ? (
        <div className="approve-product-grid">
          {displayProducts().map((prod, index) => (
            <div
              key={index}
              className="approve-product-item"
              onClick={() => handleProductClick(prod.name)}
            >
              <img src={prod.img} alt={prod.name} />
              <h3>{prod.name}</h3>
              <p>{calculateTotalComments(prod.approveComments)} comments</p> {/* Tính tổng số comment */}
            </div>
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}

      <div className="approve-pagination-controls">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>{'<<'}</button>
        <span>{`${currentPage}/${Math.ceil(filteredProducts.length / itemsPerPage)}`}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(filteredProducts.length / itemsPerPage)}>{'>>'}</button>
      </div>
    </div>
  );
}

export default ApproveView;
