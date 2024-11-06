import "../css/Sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaChartLine,
  FaUsers,
  FaDatabase,
  FaPalette,
  FaMoneyBillTransfer,
  FaAngleDown,
} from "react-icons/fa6";
import { VscSignOut } from "react-icons/vsc";
import { BsClipboardDataFill } from "react-icons/bs";

function Sidebar({ onLogout }) {
  const [openMenu, setOpenMenu] = useState(""); // Track which menu is open
  const [selected, setSelected] = useState("");

  const handleMenuClick = (menuName) => {
    const selectedItems = {
      customer: [
        "customer",
        "manage_customer",
        "banned_customer",
        "deleted_customer",
      ],
      catalog: ["catalog", "category", "product"],
      sales: ["order_management", "product_management", "review_management", "finance", "data"],
      report: ["report", "statistic"],
    };

    const isSelectedInMenu =
      selectedItems[menuName]?.includes(selected) || false;

    // Toggle the menu open/close based on current state
    if (openMenu === menuName && !isSelectedInMenu) {
      setOpenMenu(""); // Close the menu if it's already open
    } else {
      setOpenMenu(menuName); // Open the dropdown
    }
  };

  const handleSelected = (selection) => {
    setSelected(selection); // Set the selected item
  };

  return (
    <div className="sidebar__wrap">
      <div className="sidebar">
        <div className="sidebar__head">
          <img src="/images/logo.jpg" alt="Logo" /> {/* Directly reference the logo */}
        </div>
        <div className="sidebar__body">
          <div className="title">
            <h3 className="title__main">OVERVIEW</h3>
          </div>
          <div className="sidebar__content">
            {/* Dashboard Link */}
            <Link to="/dashboard" className="sidebar__link">
              <div
                className={`menu__list ${
                  selected === "Dashboard" ? "active" : ""
                }`}
                onClick={() => handleSelected("Dashboard")}
              >
                <FaChartLine className="list__icon" />
                <h3 className="list__title">Dashboard</h3>
              </div>
            </Link>

            {/* Customer Menu */}
            <button
              className="sidebar__link"
              onClick={() => handleMenuClick("customer")}
            >
              <div className="menu__list">
                <FaUsers className="list__icon" />
                <h3 className="list__title">Customer</h3>
                <FaAngleDown
                  className={`icon__down ${
                    openMenu === "customer" ? "rotate" : ""
                  }`}
                />
              </div>
              {openMenu === "customer" && (
                <div className="list__subitems">
                  <Link
                    className={`sidebar__link ${
                      selected === "manage_customer" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("manage_customer")}
                    to="/customers"
                  >
                    <h4 className="item__cate">Manage Customer</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "banned_customer" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("banned_customer")}
                    to="/banned-customers"
                  >
                    <h4 className="item__cate">Banned Customer</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "deleted_customer" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("deleted_customer")}
                    to="/deleted-customers"
                  >
                    <h4 className="item__cate">Deleted Customer</h4>
                  </Link>
                </div>
              )}
            </button>

            {/* Catalog Menu */}
            <button
              className="sidebar__link"
              onClick={() => handleMenuClick("catalog")}
            >
              <div
                className={`menu__list ${
                  selected === "catalog" ? "active" : ""
                }`}
              >
                <FaDatabase className="list__icon" />
                <h3 className="list__title">Catalog</h3>
                <FaAngleDown
                  className={`icon__down ${
                    openMenu === "catalog" ? "rotate" : ""
                  }`}
                />
              </div>
              {openMenu === "catalog" && (
                <div className="list__subitems">
                  <Link
                    className={`sidebar__link ${
                      selected === "category" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("category")}
                    to="/category"
                  >
                    <h4 className="item__cate">Category</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "product" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("product")}
                    to="/product"
                  >
                    <h4 className="item__cate">Product</h4>
                  </Link>
                </div>
              )}
            </button>

            {/* Sales Menu */}
            <button
              className="sidebar__link"
              onClick={() => handleMenuClick("sales")}
            >
              <div
                className={`menu__list ${selected === "sales" ? "active" : ""}`}
              >
                <FaMoneyBillTransfer className="list__icon" />
                <h3 className="list__title">Sales</h3>
                <FaAngleDown
                  className={`icon__down ${
                    openMenu === "sales" ? "rotate" : ""
                  }`}
                />
              </div>
              {openMenu === "sales" && (
                <div className="list__subitems">
                  <Link
                    className={`sidebar__link ${
                      selected === "order_management" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("order_management")}
                    to="/order-management"
                  >
                    <h4 className="item__cate">Order Management</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "product_management" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("product_management")}
                    to="/product-management"
                  >
                    <h4 className="item__cate">Product Management</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "review_management" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("review_management")}
                    to="/review-management"
                  >
                    <h4 className="item__cate">Review Management</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "finance" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("finance")}
                    to="/finance"
                  >
                    <h4 className="item__cate">Finance</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "data" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("data")}
                    to="/data"
                  >
                    <h4 className="item__cate">Data</h4>
                  </Link>
                </div>
              )}
            </button>

            {/* Banner Link */}
            <Link className="sidebar__link" to="/banners">
              <div
                className={`menu__list ${
                  selected === "banner" ? "active" : ""
                }`}
                onClick={() => handleSelected("banner")}
              >
                <FaPalette className="list__icon" />
                <h3 className="list__title">Banners</h3>
              </div>
            </Link>

            {/* Report Menu */}
            <button
              className="sidebar__link"
              onClick={() => handleMenuClick("report")}
            >
              <div
                className={`menu__list ${
                  selected === "reports" ? "active" : ""
                }`}
              >
                <BsClipboardDataFill className="list__icon" />
                <h3 className="list__title">Reports</h3>
                <FaAngleDown
                  className={`icon__down ${
                    openMenu === "report" ? "rotate" : ""
                  }`}
                />
              </div>
              {openMenu === "report" && (
                <div className="list__subitems">
                  <Link
                    className={`sidebar__link ${
                      selected === "report" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("report")}
                    to="/reports"
                  >
                    <h4 className="item__cate">Report</h4>
                  </Link>
                  <Link
                    className={`sidebar__link ${
                      selected === "statistic" ? "active" : ""
                    }`}
                    onClick={() => handleSelected("statistic")}
                    to="/statistics"
                  >
                    <h4 className="item__cate">Statistic</h4>
                  </Link>
                </div>
              )}
            </button>
          </div>
        </div>
        <div className="sidebar__footer">
          <Link to="#" onClick={onLogout}>
            <div className="footer__list">
              <VscSignOut className="footer__icon" />
              <h3 className="footer__title">Sign Out</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
