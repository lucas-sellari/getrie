import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import PromotionList from "../List/List.js";
import "./Search.css";

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};
    if(search) {
        params.title_like = search; //obrigado json-server pelo _like operator
    }

    axios
      .get("http://localhost:3333/promotions?_embed=comments", { params })
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, [search]);

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>PromoShow</h1>
        <Link to="/create" className="promotion-search__button">
          Nova Promoção
        </Link>
      </header>

      <input
        type="search"
        className="promotion-search__input"
        placeholder="Buscar"
        value={search} //controlled input
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />

      <PromotionList promotions={promotions} loading={!promotions.length} />
    </div>
  );
};

export default PromotionSearch;
