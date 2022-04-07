import React from "react";
import { useParams } from "react-router-dom";

import UIContainer from "components/UI/Container/Container.js";
import PromotionForm from "components/Promotion/Form/Form.js";

const PagesPromotionForm = () => {
  const { id } = useParams();

  return (
    <UIContainer>
      <PromotionForm />
    </UIContainer>
  );
};

export default PagesPromotionForm;
