import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SwapSpinner } from "react-spinners-kit";
import useApi from "components/utils/useApi.js";
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

  const [load] = useApi({
    url: `/promotions/${id}`,
    method: "get",
    onCompleted: (response) => {
      setValues(response.data);
    },
  });

  const [update, updateInfo] = useApi({
    url: id ? `/promotions/${id}` : "/promotions",
    method: id ? "put" : "post",
    //data: values,
    onCompleted: (response) => {
      if (!response.error) {
        navigate("/");
      }
    },
  });

  useEffect(() => {
    if (id) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onChange = (event) => {
    const { name, value } = event.target;
    //console.log({ name, value });

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    update({
      data: values,
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
          {updateInfo.loading && (
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
                color: "#888",
              }}
            >
              <h1>Salvando dados... 🤗</h1>
            </span>
          )}
        </form>
      )}
    </div>
  );
};

export default PromotionForm;
