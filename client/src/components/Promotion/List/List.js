import React from "react";
import { SwapSpinner } from "react-spinners-kit";
import PromotionCard from "../Card/Card.js";
import "./List.css";

const PromotionList = ({ loading, promotions }) => {
  if (loading) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "120px"
        }}>
            <SwapSpinner />
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
