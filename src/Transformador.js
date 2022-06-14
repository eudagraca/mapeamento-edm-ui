import React, { useEffect, useState } from "react";
import Header from "./Header";
import Spinner from "./Spinner";
import { baseUrl } from "./utils";
const axios = require("axios").default;



export default function Transformador() {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [areas, setAreas] = useState();
  const [area, setArea] = useState();
  const [codPt, setCodePT] = useState();
  const [potencia, setPotencia] = useState();
  const [codSe, setCodSe] = useState();
  const [codLinha, setCodeLinha] = useState();
  const [isLoading, setIsLoading] = useState(false);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
      console.log(position.coords.latitude);

    });
  } else {
    alert("Sorry, your browser does not support HTML5 geolocation.");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post(`${baseUrl()}/transformador`, {
        cod_pt: codPt,
        potencia: potencia,
        cod_se: codSe,
        local_id: area,
        cod_linha: codLinha,
        longitude: lng,
        latitude: lat,
      })
      .then(function(response) {
        window.open("/transformadores/","_self");
        // console.log(response);

      })
      .catch(function(error) {
        console.log(error.response);
      });
    setIsLoading(false);

  };


  useEffect(() => {
    const getAreas = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl()}/area`);
        const data = await response.json();
        setAreas(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getAreas();
  }, []);

  return (
    <div>
      {isLoading ? <Spinner /> : ""}

      <Header />
      <div className="uk-background-default uk-padding">
        <br />
        <h2 className="uk-text-bolder uk-margin-medium-left uk-margin-large-top ">
          Registo de transformadores de tensão
        </h2>
        <div className="uk-width-1-1@s uk-padding-remove uk-margin-large-right uk-margin-large-bottom">
              <a className="uk-margin-medium-right uk-align-right uk-button uk-button-text" href="/transformadores">
                Lista de transformadores
              </a>
            </div>
        <form
          className="uk-form-stacked uk-width-1-1@s uk-margin-large-top uk-margin-medium-right"
          onSubmit={handleSubmit}
        >
          <div className="uk-width-1-1@s uk-grid">
            <div className="uk-margin uk-width-1-3@s uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="name">
                Potência
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  placeholder="Potência"
                  name="potencia"
                  id="potencia"
                  onChange={(e) => setPotencia(e.target.value) }
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="uk-width-1-3@s uk-padding-remove-right">
              <label className="uk-form-label uk-text-bolder" htmlFor="name">
                Código do transformador
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  placeholder="Código do PT"
                  name="cod_pt"
                  id="cod_pt"
                  type="text"
                  onChange={(e) => setCodePT(e.target.value) }
                  required
                />
              </div>
            </div>

            <div className="uk-width-1-3@s uk-padding-remove-right">
              <label className="uk-form-label uk-text-bolder" htmlFor="name">
                Código da Linha
              </label>
              <div className="uk-form-controls">
                <input
                  className="uk-input"
                  placeholder="Código da Linha"
                  name="cod_linha"
                  id="cod_linha"
                  type="text"
                  onChange={(e) => setCodeLinha(e.target.value) }
                  required
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="published">
                Área geográfica onde o PT se encontra
              </label>
              <select
                className="uk-select "
                name="local_id"
                onChange={(e) => setArea(e.target.value)}
                required
              >
                <option value="">Por favor seleccione...</option>
                {areas &&
                  areas.map(function(value, key) {
                    return (
                      <option key={key} index={value.id} value={value.id}>
                        {`${value.provincia},  ${value.cidade} ${value.bairro}`}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Latitude
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder="Latitude"
                  name="lat"
                  id="lat"
                  onChange={(e) => setLat(e.target.value)}
                  defaultValue={lat}
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
                  placeholder="Longitude"
                  name="lng"
                  id="lng"
                  type="text"
                  onChange={(e) => setLng(e.target.value)}
                  defaultValue={lng}
                  required
                />
              </div>
            </div>

            <div className="uk-margin-remove-top uk-width-1-4@s  uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="user">
                Codigo SE
              </label>
              <div className="uk-form-controls">
                <input
                  // readOnly
                  className="uk-input"
                  placeholder="Código SE"
                  name="cod_se"
                  id="cod_se"
                  type="text"
                  onChange={(e) => setCodSe(e.target.value) }
                  required
                />
              </div>
            </div>
            <div className="uk-width-1-1@s uk-padding-remove uk-margin-top">
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
