import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsByCategory } from '../data/productsData'; // Static data for now
import '../css/StatusView.css'; // Specific CSS for RejectView

const itemsPerPage = 10;

function RejectView() {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // Set products from static data
      setProducts(productsByCategory[category.toLowerCase()] || []);
    };

    fetchData();
  }, [category]);

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hàm tính tổng số comment dựa trên quantity của rejectComments
  const calculateTotalComments = (rejectComments) => {
    return rejectComments.reduce((total, comment) => total + comment.quantity, 0);
  };

  const displayProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handleProductClick = (productName) => {
    // Navigate to the ProductDetailRejectView with category and product name
    navigate(`/reject-management/${category}/${encodeURIComponent(productName)}`);
  };

  return (
    <div className="approve-view">
      <button className="back-button" onClick={() => navigate('/review-management')}>Back</button>
      <h2>Reject View ({category.charAt(0).toUpperCase() + category.slice(1)})</h2>
      <input
        type="text"
        placeholder="Search..."
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
              onClick={() => handleProductClick(prod.name)} // Pass product name to navigate
            >
              <img src={prod.img} alt={prod.name} />
              <h3>{prod.name}</h3>
              <p>{calculateTotalComments(prod.rejectComments)} comments</p> {/* Tính tổng số comment */}
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

export default RejectView;
