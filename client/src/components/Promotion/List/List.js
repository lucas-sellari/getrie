import React from "react";
import { SwapSpinner } from "react-spinners-kit";
import PromotionCard from "../Card/Card.js";
import "./List.css";

const PromotionList = ({ loading, promotions, error }) => {
  if (error) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "120px",
          color: "#888",
        }}
      >
        <h1>Parece que tem algo de errado... 🤔</h1>
      </div>
    );
  } else if (loading || promotions === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "120px",
        }}
      >
        <SwapSpinner />
      </div>
    );
  } else if (promotions.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "120px",
          color: "#888",
        }}
      >
        <h1>Nenhum resultado encontrado... 😐</h1>
      </div>
    );
  } else {
    return (
      <div className="promotion-list">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))}
      </div>
    );
  }
};

export default PromotionList;
