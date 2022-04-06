import React, { useEffect, useState } from "react";
import axios from "axios";

import PromotionCard from "components/Promotion/Card/Card.js";

const PagesPromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3333/promotions?_embed=comments")
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, []);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "30px auto",
      }}
    >
      {promotions.map((promotion) => {
        return (<PromotionCard key={promotion.id} promotion={promotion} />);
      })}
    </div>
  );
};

export default PagesPromotionSearch;
