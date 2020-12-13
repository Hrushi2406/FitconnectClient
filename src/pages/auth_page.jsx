import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Interests from "../components/auth/interest";
import Login, { LOGIN_QUERY } from "../components/auth/login";
import Signup from "../components/auth/signup";
import "../css/pages/auth.css";

function AuthPage() {
  const [currentIndex, setcurrentIndex] = useState(0);
  const { state } = useLocation();

  useEffect(() => {
    if (state !== undefined) {
      if (state.data.showInterest) {
        setcurrentIndex(2);
      }
    }
  }, [state]);

  const pages = [
    <Login onChange={() => setcurrentIndex(1)} />,
    <Signup
      onSignUpSuccess={() => setcurrentIndex(2)}
      onChange={() => setcurrentIndex(0)}
    />,
    <Interests onChange={() => setcurrentIndex(1)} />,
  ];

  const getAppropriatePage = () => pages[currentIndex];

  return (
    <React.Fragment>
      <div className="auth-grid">
        <img
          className="auth-img"
          src="https://images.unsplash.com/photo-1506197061617-7f5c0b093236?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1005&q=80"
          alt="Auth page image"
        />

        <div>
          <h1> Fitconnect</h1>
          <h4 style={{ color: "#b2b2b2" }}>A fitness networking platform</h4>
        </div>

        {getAppropriatePage()}

        {/* <Login /> */}

        <h6 style={{ color: "#b2b2b2" }} className="mb8">
          All rights reserved @fitconnect
        </h6>
      </div>
    </React.Fragment>
  );
}

export default AuthPage;
