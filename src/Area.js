import React, { useState } from "react";
import Header from "./Header";
import { baseUrl } from "./utils";
const axios = require("axios").default;

export default function Areas() {
  // const [lat, setLat] = useState();
  // const [lng, setLng] = useState();
  const [bairro, setBairro] = useState();
  const [provincia, setProvincia] = useState();
  const [cidade, setCidade] = useState();

  const provincias = [
    "Cabo Delgado",
    "Niassa",
    "Nampula",
    "Zambezia",
    "Tete",
    "Sofala",
    "Manica",
    "Tete",
    "Inhambane",
    "Gaza",
    "Maputo Cidade",
    "Maputo Provincia",
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl()}/area`, {
        cidade: cidade,
        provincia: provincia,
        bairro: bairro,
        // created_at: getDate()
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  return (
    <div>
      <Header />
      <div className="uk-background-default uk-padding">
        <br />
        <h2 className="uk-text-bolder uk-margin-medium-left uk-margin-large-top">
          Mapeamento geografico de areas
        </h2>
        <form
          className="uk-form-stacked uk-width-1-1@s uk-margin-large-top uk-margin-medium-right"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="uk-width-1-1@s uk-grid">
            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="published">
                Provincia
              </label>
              <select
                className="uk-select "
                name="type"
                onChange={(e) => setProvincia(e.target.value)}
                required
              >
                <option value="">Por favor seleccione...</option>
                {provincias.map(function(value, key) {
                  return (
                    <option key={key} index={value} value={value}>
                      {value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Bairro
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder="Bairro"
                  name="bairro"
                  id="bairro"
                  type="text"
                  onChange={(e) => setBairro(e.target.value)}

                  required
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Cidade/Vila
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder="Cidade"
                  name="cidade"
                  id="cidade"
                  type="text"
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="uk-width-1-1@s uk-padding-remove uk-margin-large-right">
              <button className=" uk-margin-medium-right uk-align-right uk-button uk-button-primary">
                Enviar os dados
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
