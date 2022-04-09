import React, { useEffect, useState } from "react";
import UIModal from "components/UI/Modal/Modal.js";
import PromotionModalCommentsTree from "./CommentsTree/CommentsTree.js";
import useApi from "components/utils/useApi.js";
import "./Modal.css";

const PromotionModal = ({ promotionId, onClickClose }) => {
  const [comment, setComment] = useState("");
  const [load, loadInfo] = useApi({
    url: "/comments",
    params: {
      promotionId,
      _expand: "user",
    },
  });

  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "post",
  });

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendComment({
        data: {
          userId: 1,
          promotionId: promotionId,
          comment,
        },
      });
      setComment("");
      load();
    } catch (error) {
      console.log(error.toJSON());
    }
  };

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
        <textarea
          placeholder="Comentar..."
          onChange={(event) => {
            setComment(event.target.value);
          }}
          value={comment}
        />
        <button type="submit" disabled={sendCommentInfo.loading}>
          {sendCommentInfo.loading ? "Enviando..." : "Enviar"}
        </button>
      </form>

      <PromotionModalCommentsTree comments={loadInfo.data} />
    </UIModal>
  );
};

export default PromotionModal;
