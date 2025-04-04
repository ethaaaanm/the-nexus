import React from "react";
import { useNavigate } from "react-router-dom";
import "./misc.css"; 

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-content-wrapper">
        <h1 className="error-title">ERROR 404</h1>
        <h4 className="error-description">YOU GOT CROSSED UP INTO THE ABYSS.</h4>
        <div className="divider"></div>
        <button className="back-home-button" onClick={() => {navigate("/"); window.scrollTo(0, 0); }}>
          <h5 className="button-text">BACK HOME</h5>
        </button>
      </div>
    </div>
  );
}

export default ErrorPage