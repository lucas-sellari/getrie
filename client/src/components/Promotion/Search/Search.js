import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import PromotionList from "../List/List.js";
import useApi from "components/utils/useApi.js";
import UIInfiniteScroll from "components/UI/InfiniteScroll/InfiniteScroll.js";
import UIButton from "components/UI/Button/Button.js";
import "./Search.css";

const baseParams = {
  _embed: "comments",
  _order: "desc",
  _sort: "id",
  _limit: 3,
};

const PromotionSearch = () => {
  const mountRef = useRef(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [load, loadInfo] = useApi({
    debounceDelay: 300,
    url: "/promotions",
    method: "get",
  });

  useEffect(() => {
    load({
      debounced: mountRef.current,
      params: {
        ...baseParams,
        _page: 1,
        title_like: search || undefined,
      },
    });
    if (!mountRef.current) {
      mountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fecthMore = () => {
    const newPage = page + 1;

    load({
      isFetchMore: true,
      params: {
        ...baseParams,
        _page: newPage,
        title_like: search || undefined,
      },
      updateRequestInfo: (newRequestInfo, previousRequestInfo) => ({
        ...newRequestInfo,
        data: [...previousRequestInfo.data, ...newRequestInfo.data],
      }),
    });

    setPage(newPage);
  };

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>PromoShow</h1>
        <UIButton
          component={Link}
          to="/create"
          //theme="contained-green"
        >
          Nova Promoção
        </UIButton>
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
      {loadInfo.data &&
        !loadInfo.loading &&
        loadInfo.data?.length < loadInfo.total && (
          <UIInfiniteScroll fecthMore={fecthMore} />
        )}
    </div>
  );
};

export default PromotionSearch;
