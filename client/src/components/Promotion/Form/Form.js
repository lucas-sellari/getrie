import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Form.css";

const initialValue = {
  title: "",
  price: 0,
  imageUrl: "",
  url: "",
};

const PromotionForm = () => {
  const [values, setValues] = useState(initialValue);
  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    //console.log({ name, value });

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3333/promotions", values)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  return (
    <div>
      <h1>PromoShow</h1>
      <h2>Nova Promoção</h2>

      <form onSubmit={onSubmit}>
        <div className="promotion-form__group">
          <label htmlFor="title">Título</label>
          <input id="title" name="title" type="text" onChange={onChange} />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="url">Link</label>
          <input id="url" name="url" type="text" onChange={onChange} />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="imageUrl">Imagem (URL)</label>
          <input
            id="imageUrl"
            name="imageUrl"
            type="text"
            onChange={onChange}
          />
        </div>

        <div className="promotion-form__group">
          <label htmlFor="price">Preço</label>
          <input id="price" name="price" type="number" step="0.01" onChange={onChange} />
        </div>

        <div>
          <button type="submit">Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
