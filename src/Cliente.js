import React, { useEffect, useState } from "react";
import Select from "react-select";

import Header from "./Header";
import Spinner from "./Spinner";
import { baseUrl } from "./utils";
const axios = require("axios").default;

export default function Consumidor() {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [nome, setNome] = useState();
  const [versao, setVersao] = useState();
  const [contador, setContador] = useState();
  const [consumo, setConsumo] = useState();
  const [transformador_id, setTransformadorId] = useState();
  const [data_registo, setDataRegisto] = useState();
  const [pt, setPt] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }

  let allTrans = [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(transformador_id);
    axios
      .post(`${baseUrl()}/consumidor`, {
        nome: nome,
        contador: contador,
        consumo: consumo,
        data_registo: data_registo,
        logitude: lng,
        latitude: lat,
        versao: versao,
        transformador_id: transformador_id.value,
      })
      .then(function(response) {
        window.open("/consumidores","_self");

        console.log(response);
      })
      .catch(function(error) {
        console.log(error.response);
      });
  };

  useEffect(() => {
    const getPT = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl()}/transformador`);
        const data = await response.json();

        /* this is an example for new snippet extension make by me xD */
        for (const element of data) {
          allTrans.push({
            value: element.id,
            label:
              element.cod_se +
              ", " +
              element.cod_linha +
              ", " +
              element.potencia,
          });
        }
        setPt(allTrans);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getPT();
  }, []);

  return (
    <div>
      <Header />
      {isLoading ? <Spinner /> : ""}

      <div className="uk-background-default uk-padding">
        <br />
        <h2 className="uk-text-bolder uk-margin-medium-left uk-margin-large-top ">
          Dados do consumidor
        </h2>

        <div className="uk-width-1-1@s uk-padding-remove uk-margin-large-right uk-margin-large-bottom">
          <a
            className="uk-margin-medium-right uk-align-right uk-button uk-button-text"
            href="/consumidores"
          >
            Lista de Consumidores
          </a>
        </div>
        <form
          className="uk-form-stacked uk-width-1-1@s uk-margin-large-top uk-margin-medium-right"
          onSubmit={handleSubmit}
        >
          <div className="uk-width-1-1@s uk-grid">
            <div className="uk-margin uk-width-1-4@s uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="name">
                Nome
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  placeholder="Nome"
                  name="nome"
                  id="nome"
                  type="text"
                  required
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
            </div>
            <div className="uk-width-1-4@s uk-padding-remove-right">
              <label className="uk-form-label uk-text-bolder" htmlFor="name">
                Número de Contador
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  placeholder="Número de Contador"
                  name="contador"
                  id="contador"
                  type="number"
                  required
                  onChange={(e) => setContador(e.target.value)}
                />
              </div>
            </div>

            <div className="uk-width-1-4@s uk-padding-remove-right">
              <label className="uk-form-label uk-text-bolder" htmlFor="name">
                Consumo
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  placeholder="Consumo"
                  name="consumo"
                  id="consumo"
                  type="number"
                  required
                  onChange={(e) => setConsumo(e.target.value)}
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Latitude
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder=""
                  name="lat"
                  id="lat"
                  defaultValue={lat}
                  onChange={(e) => setLat(e.target.value)}
                  type="text"
                  required
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Logitude
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder=""
                  name="lng"
                  id="lng"
                  defaultValue={lng}
                  type="text"
                  required
                  onChange={(e) => setLng(e.target.value)}
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Versão do contador
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder="Versão"
                  name="versao"
                  id="versao"
                  type="text"
                  required
                  onChange={(e) => setVersao(e.target.value)}
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Data de registo
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder="Data"
                  name="data_registo"
                  id="data_registo"
                  type="date"
                  required
                  onChange={(e) => setDataRegisto(e.target.value)}
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="published">
                Transformador (PT)
              </label>

              <Select
                className="uk-form-select"
                defaultValue={selectedOption}
                onChange={setTransformadorId}
                options={pt}
              />

              {/* <select
                className="uk-select "
                name="type"
                onChange={(e) => setTransformadorId(e.target.value)}
                required
              >
                <option value="">Por favor seleccione...</option>
                {pt && pt.map(function (value, key) {
                  return (
                    <option key={key} index={value.value} value={value.key}>
                      {`${value.potencia} - ${value.versao}`}
                    </option>
                  );
                })}
              </select> */}
            </div>
            <div className="uk-width-1-1@s uk-padding-remove uk-margin-medium-top">
              <button className="uk-align-right uk-button uk-button-primary">
                Enviar os dados
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
