import React, { useState, useHistory, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {
  const [openNav, setopenNav] = useState(false);

  const location = useLocation();

  const [currentActive, setcurrentActive] = useState(location.pathname);

  console.log(location);

  const handleClick = () => {
    setopenNav(false);
  };

  useEffect(() => {
    setcurrentActive(location.pathname);
  }, [location]);

  return (
    <nav
      className="navbar"
      style={{ display: currentActive === "/auth" ? "none" : "" }}
    >
      <i
        className="fas fa-compass burger"
        onClick={() => setopenNav(!openNav)}
      ></i>
      <h3 className="logo">Fitconnect</h3>

      <div
        className="nav-div"
        style={{
          transform: openNav ? "translateY(0)" : "",
        }}
      >
        <Link
          to="/"
          onClick={handleClick}
          className={currentActive === "/" ? "primary" : " "}
        >
          <p>Home </p>
        </Link>
        <div className="divider"></div>

        <Link
          to="/search"
          onClick={handleClick}
          className={currentActive === "/search" ? "primary" : " "}
        >
          <p>Search </p>
        </Link>
        <div className="divider"></div>
        <Link
          to="/payments"
          onClick={handleClick}
          className={currentActive === "/payments" ? "primary" : " "}
        >
          <p>Payments </p>
        </Link>
        <div className="divider"></div>

        <Link
          to="/yourTrainers"
          onClick={handleClick}
          className={currentActive === "/yourTrainers" ? "primary" : " "}
        >
          <p>Your Trainers</p>
        </Link>

        <div className="divider"></div>

        <Link
          to="/profile"
          onClick={handleClick}
          className={currentActive === "/profile" ? "primary" : " "}
        >
          <p>Profile </p>
        </Link>

        <div className="divider"></div>
      </div>
    </nav>
  );
}

export default Navbar;
