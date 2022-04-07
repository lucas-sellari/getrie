import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PromotionList from "../List/List.js";
import useApi from "components/utils/useApi.js";
import "./Search.css";

const PromotionSearch = () => {
  const [search, setSearch] = useState("");

  const [load, loadInfo] = useApi({
    url: "/promotions",
    method: "get",
    params: {
      _embed: "comments",
      _order: "desc",
      _sort: "id",
      title_like: search || undefined,
    },
  });

  useEffect(() => {
    load();
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

      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
    </div>
  );
};

export default PromotionSearch;
