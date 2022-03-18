import React from "react";
import Icon from "../icons/icons8-truck-100.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="main-head">
      <nav>
        <div className="logo">
          <img src={Icon} alt="logo" />
          <h1>Vehicle System</h1>
        </div>
        <ul>
          <Link to="/">
            <li>
              <a>Home</a>
            </li>
          </Link>
          <Link to="/members">
            <li>
              <a>Members</a>
            </li>
          </Link>
          <Link to="/vehicles">
            <li>
              <a>Vehicles</a>
            </li>
          </Link>
          <Link to="/lists">
            <li>
              <a>Lists</a>
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
