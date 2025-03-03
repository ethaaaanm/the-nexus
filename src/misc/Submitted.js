import React from "react";
import { useNavigate } from "react-router-dom";
import "./misc.css"; 

function SubmittedPage() {
  const navigate = useNavigate();

  return (
    <div className="submit-page">
      <div className="submit-content-wrapper">
        <h1 className="submit-title">YOUR SUBMISSION WAS SUCCESSFUL.</h1>
        <h4 className="submit-description">WE'LL HIT YOU BACK AS SOON AS WE CAN.</h4>
        <div className="divider"></div>
        <button className="back-home-button" onClick={() => {navigate("/"); window.scrollTo(0, 0); }}>
          <h5 className="button-text">BACK HOME</h5>
        </button>
      </div>
    </div>
  );
}

export default SubmittedPage ;