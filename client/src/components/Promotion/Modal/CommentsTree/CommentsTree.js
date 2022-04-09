import React from "react";
import { SwapSpinner } from "react-spinners-kit";
import "./CommentsTree.css";

const PromotionModalCommentsTree = ({ comments }) => {
  if (!comments) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "15px",
        }}
      >
        <SwapSpinner />
      </div>
    );
  }
  return (
    <ul className="promotion-modal-comments-tree">
      {comments.map((item) => (
        <li key={item.id} className="promotion-modal-comments-tree__item">
          <img
            className="promotion-modal-comments-tree__item-avatar"
            src={item.user.avatarUrl}
            alt={`imagem de perfil do usuário ${item.user.name}`}
          />
          <div className="promotion-modal-comments-tree__item-info">
            <span className="promotion-modal-comments-tree__item-name">{item.user.name}</span>
            <p>{item.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PromotionModalCommentsTree;
