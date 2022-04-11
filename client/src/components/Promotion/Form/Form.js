import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SwapSpinner } from "react-spinners-kit";
import useApi from "components/utils/useApi.js";
import Field from "components/Form/Field/Field.js";
import { Formik, Form } from "formik";
import schema from "./Schema.js";
import "./Form.css";

const initialValue = {
  title: "",
  price: 0,
  imageUrl: "",
  url: "",
};

const PromotionForm = ({ id }) => {
  const navigate = useNavigate();

  const [load, loadInfo] = useApi({
    url: `/promotions/${id}`,
    method: "get",
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

  const onSubmit = (formValues) => {
    update({
      data: formValues,
    });
  };

  const values = id ? loadInfo.data : initialValue;

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
        <Formik
          initialValues={values}
          onSubmit={onSubmit}
          validationSchema={schema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="promotion-form__group">
                <Field name="title" type="text" label="Título" />
              </div>

              <div className="promotion-form__group">
                <Field name="url" type="text" label="Link" />
              </div>

              <div className="promotion-form__group">
                <Field name="imageUrl" type="text" label="Imagem (URL)" />
              </div>

              <div className="promotion-form__group">
                <Field name="price" type="number" step="0.01" label="Preço" />
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
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default PromotionForm;
