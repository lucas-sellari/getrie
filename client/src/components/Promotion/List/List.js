import React, { useState } from "react";
import { SwapSpinner } from "react-spinners-kit";
import PromotionCard from "../Card/Card.js";
import UIModal from "components/UI/Modal/Modal.js";
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
          <PromotionCard
            key={promotion.id}
            promotion={promotion}
            onClickComments={() => setPromotionId(promotion.id)}
          />
        ))}
        <UIModal
          isOpen={Boolean(promotionId)}
          onClickClose={() => setPromotionId(null)}
        >
          <h1>Comentários</h1>
        </UIModal>
      </div>
    );
  }
};

export default PromotionList;
