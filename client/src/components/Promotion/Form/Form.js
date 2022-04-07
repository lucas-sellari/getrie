import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwapSpinner } from "react-spinners-kit";
import axios from "axios";
import "./Form.css";

const initialValue = {
  title: "",
  price: 0,
  imageUrl: "",
  url: "",
};

const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValue);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      //edição...
      axios
        .get(`http://localhost:3333/promotions/${id}`)
        .then((response) => {
          setValues(response.data);
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
    }
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;
    //console.log({ name, value });

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const method = id ? "put" : "post";
    const url = id
      ? `http://localhost:3333/promotions/${id}`
      : "http://localhost:3333/promotions";

    axios[method](url, values)
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
      <h2>{id ? "Editar" : "Nova"} Promoção</h2>

      {!values ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "120px",
          }}
        >
          <SwapSpinner />
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="promotion-form__group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={onChange}
              value={values.title}
            />
          </div>

          <div className="promotion-form__group">
            <label htmlFor="url">Link</label>
            <input
              id="url"
              name="url"
              type="text"
              onChange={onChange}
              value={values.url}
            />
          </div>

          <div className="promotion-form__group">
            <label htmlFor="imageUrl">Imagem (URL)</label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              onChange={onChange}
              value={values.imageUrl}
            />
          </div>

          <div className="promotion-form__group">
            <label htmlFor="price">Preço</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              onChange={onChange}
              value={values.price}
            />
          </div>

          <div>
            <button type="submit">Salvar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PromotionForm;
