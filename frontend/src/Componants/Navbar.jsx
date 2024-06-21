import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar" aria-label="Main Navigation">
      <NavLink to="/" exact activeClassName="active" aria-current="page">
        Roxiler Systems
      </NavLink>
      <NavLink to="/dashboard" activeClassName="active">
        PieChart
      </NavLink>
      <NavLink to="/static" activeClassName="active">
        Static
      </NavLink>
      <NavLink to="/barchart" activeClassName="active">
        BarChart
      </NavLink>
    </nav>
  );
}

export default Navbar;
