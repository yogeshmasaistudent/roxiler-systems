import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <div className="navbar-brand">
        <NavLink
          to="/"
          exact
          activeClassName="active"
          aria-current="page"
          className="brand"
        >
          Roxiler Systems
        </NavLink>
        <button
          className="hamburger"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
      </div>
      <div className={`navbar-menu ${isOpen ? "is-active" : ""}`}>
        <NavLink to="/dashboard" activeClassName="active">
          PieChart
        </NavLink>
        <NavLink to="/static" activeClassName="active">
          Static
        </NavLink>
        <NavLink to="/barchart" activeClassName="active">
          BarChart
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
