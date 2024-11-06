import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";

const api = "/api/admin/reports/coupons";
const apiFilter = "/api/admin/reports/coupons/filter";

// Function to parse a date string in "YYYY-MM-DD" format from input and "DD-MM-YYYY" from JSON data
const parseDate = (dateString) => {
  if (!dateString) return null;
  
  // Check for "YYYY-MM-DD" format from <input type="date">
  if (dateString.includes("-") && dateString.split("-")[0].length === 4) {
    return new Date(dateString);
  }

  // Check for "DD-MM-YYYY" format from JSON data
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // JavaScript Date months are zero-indexed
};

const Coupons = ({ startDate, endDate }) => {
  const [coupons, setCoupons] = useState([]);
  const [filteredCoupons, setFilteredCoupons] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);


  const fetchCouponsReport = async() =>{
    try{
      const response = await axios.get(`${api}`);
      setCoupons(response.data);
      setFilteredCoupons(response.data); // Initialize with unfiltered data
    }catch(error){
      console.error("fetch error: ", error);
    }
  }

  const applyDateFilter = async () => {
    try {
      // Check if endDate is provided, if not, set it to the current date
      const effectiveEndDate = endDate ? endDate : new Date().toISOString().split('T')[0];

      const formData = new FormData();
      formData.append("startDate", startDate);
      formData.append("endDate", effectiveEndDate);

      // Convert FormData to query string
      // const queryParams = new URLSearchParams(formData).toString();

      // Send a GET request with query parameters
      const response = await axios.post(`${apiFilter}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setFilteredCoupons(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCouponsReport();
  }, []);

  useEffect(() => {
    if (startDate || endDate) {
      applyDateFilter();
    }
  }, [startDate, endDate]);

  const totalResult = filteredCoupons.length;
  const totalPages = Math.ceil(totalResult / itemPerPage);

  const pagedResult = filteredCoupons.slice(
    (currentPage - 1) * itemPerPage,
    currentPage * itemPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const handleItemPerPageChange = (e) => {
    setItemPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="card-body">
      <div className="items-per-page">
        <label>Items per page: </label>
        <select value={itemPerPage} onChange={handleItemPerPageChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Coupons</th>
            <th>Orders</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        {pagedResult.map((shp, index) => (
            <tr key={index}>
            <td>{shp.shippingMethod}</td>
            <td>{shp.orders}</td>
            <td>{shp.total}</td>
          </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="custom-pagination">
          <Pagination.First
            onClick={goToFirstPage}
            disabled={currentPage <= 1}
          />
          <Pagination.Prev
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
          />

          <Pagination.Item>
            {currentPage} / {totalPages}
          </Pagination.Item>

          <Pagination.Next
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
          />
          <Pagination.Last
            onClick={goToLastPage}
            disabled={currentPage >= totalPages}
          />
        </Pagination>
    </div>
  );
};
export default Coupons;
