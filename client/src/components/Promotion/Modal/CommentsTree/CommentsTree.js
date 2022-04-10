import React, { useState, useMemo } from "react";
import { SwapSpinner } from "react-spinners-kit";
import "./CommentsTree.css";

const getTree = (list) => {
  if (!list) {
    return [];
  }
  const roots = [];
  const childrenByParentId = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }

    if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    }

    childrenByParentId[item.parentId].push(item);
  });

  const buildNodes = (nodes) => {
    if (!nodes) {
      return null;
    }
    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentId[node.id]),
    }));
  };

  return buildNodes(roots);
};

const PromotionModalCommentsTree = ({ comments, sendComment }) => {
  const tree = useMemo(() => getTree(comments), [comments]);
  const [comment, setComment] = useState("");
  const [activeCommentBox, setActiveCommentBox] = useState(null);

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

  const renderItem = (item) => {
    return (
      <li key={item.id} className="promotion-modal-comments-tree__item">
        <img
          className="promotion-modal-comments-tree__item-avatar"
          src={item.user.avatarUrl}
          alt={`imagem de perfil do usuário ${item.user.name}`}
        />
        <div className="promotion-modal-comments-tree__item-info">
          <span className="promotion-modal-comments-tree__item-name">
            {item.user.name}
          </span>
          <p>{item.comment}</p>
          <button
            type="button"
            className="promotion-modal-comments-tree__answer-button"
            onClick={() => {
              setComment("");
              setActiveCommentBox(
                activeCommentBox === item.id ? null : item.id
              );
            }}
          >
            Responder
          </button>
          {activeCommentBox === item.id && (
            <div className="promotion-modal-comments-tree__comment-box">
              <textarea
                placeholder="Responder..."
                value={comment}
                onChange={(event) => setComment(event.target.value)}
              />
              <button
                type="button"
                className="promotion-modal-comments-tree__send-button"
                onClick={() => {
                  sendComment(comment, item.id);
                  setComment("");
                  setActiveCommentBox(null);
                }}
              >
                Enviar
              </button>
            </div>
          )}
          {item.children && renderList(item.children)}
        </div>
      </li>
    );
  };

  const renderList = (list) => {
    return (
      <ul className="promotion-modal-comments-tree">
        {list.map((item) => renderItem(item))}
      </ul>
    );
  };

  return renderList(tree);
};

//PromotionModalCommentsTree.defaultProps = {
//  sendComment: (comment, parentId) => {
//    console.log({ comment, parentId });
//  },
//};

export default PromotionModalCommentsTree;
