import React, { useState } from "react";
import { SwapSpinner } from "react-spinners-kit";
import PromotionCard from "../Card/Card.js";
import PromotionModal from "../Modal/Modal.js";
import "./List.css";

const PromotionList = ({ loading, promotions, error }) => {
  const [promotionId, setPromotionId] = useState(null);
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
  } else if (promotions === null) {
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
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            onClickComments={() => setPromotionId(promotion.id)}
          />
        ))}
        {loading && (
          <div
            style={{
              textAlign: "center",
            }}
          >
            Carregando mais promoções...
          </div>
        )}
        {promotionId && (
          <PromotionModal
            promotionId={promotionId}
            onClickClose={() => setPromotionId(null)}
          />
        )}
      </div>
    );
  }
};

export default PromotionList;
