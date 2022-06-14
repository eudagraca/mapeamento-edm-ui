import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";

import Header from "./Header";
import AppViewSingle from "./Mapa";
import Spinner from "./Spinner";
import { baseUrl } from "./utils";

export default function CustomerDetails() {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [nome, setNome] = useState();
  const [versao, setVersao] = useState();
  const [contador, setContador] = useState();
  const [consumo, setConsumo] = useState();
  const [custId, setCustId] = useState();
  const [transformador_id, setTransformadorId] = useState();
  const [data_registo, setDataRegisto] = useState();
  const [pt, setPt] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let { id } = useParams();
  //   alert("Sorry, your browser does not support HTML5 geolocation.");

  let allTrans = [];
  let select = {};

  useEffect(() => {
    const getCustomer = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl()}/consumidor/${id}`);
        const data = await response.json();
        setNome(data.nome);
        setContador(data.contador);
        setLat(data.latitude);
        setLng(data.logitude);
        setConsumo(data.consumo);
        setDataRegisto(data.data_registo);
        setVersao(data.versao);
        setCustId(data.id);

        select = {
          value: data.transformador.id,
          label: `${data.transformador.potencia} ${data.transformador.fusiveis}`,
        };
        setSelectedOption(select);
        setPt(data);
        // setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    const getPT = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch(`${baseUrl()}/tranformador`);
        const data = await response.json();

        for (const element of data) {
          allTrans.push({
            value: element.id,
            label: element.potencia + " " + element.versao,
          });
        }
        setPt(allTrans);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCustomer();

    getPT();
  }, []);

  return (
    <div>
      {isLoading ? <Spinner /> : ""}

      <Header />
      <div className="uk-background-default uk-padding">
        <br />
        <h2 className="uk-text-bolder uk-margin-medium-left uk-margin-large-top ">
          Dados do consumidor
        </h2>
        <form className="uk-form-stacked uk-width-1-1@s uk-margin-large-top uk-margin-medium-right">
          <div className="uk-width-1-1@s uk-grid">
            <div className="uk-margin uk-width-1-4@s uk-padding-remove-right">
              <label className="uk-form-label" htmlFor="name">
                Nome
              </label>
              <div className="uk-form-controls">
                <input
                  readOnly
                  className="uk-input"
                  placeholder="Nome"
                  name="nome"
                  defaultValue={nome}
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
                  readOnly
                  className="uk-input"
                  placeholder="Número de Contador"
                  name="contador"
                  id="contador"
                  type="number"
                  defaultValue={contador}
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
                  readOnly
                  className="uk-input"
                  placeholder="Consumo"
                  name="consumo"
                  id="consumo"
                  defaultValue={consumo}
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
                  readOnly
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
                  readOnly
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
                  readOnly
                  className="uk-input"
                  placeholder="Versão"
                  name="versao"
                  id="versao"
                  defaultValue={versao}
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
                  readOnly
                  className="uk-input"
                  placeholder="Data"
                  name="data_registo"
                  id="data_registo"
                  defaultValue={data_registo}
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
                isDisabled
                className="uk-form-select"
                defaultValue={{ value: 1, label: "23044W 90" }}
                onChange={setTransformadorId}
                options={pt}
              />
            </div>
            <div className="uk-width-1-1@s uk-padding-remove uk-margin-medium-top">
              <Link
                className="uk-button uk-text-capitalize uk-button-small uk-margin-large-left uk-align-right"
                to="/mapa"
                state={pt}
              >
                <span uk-icon="icon: location; ratio: 1.2"></span>
              </Link>
            </div>
          </div>
          <AppViewSingle
            lat={lat}
            center={{ lat: lat, lng: lng }}
            lng={lng}
            name={nome}
            id={custId}
          ></AppViewSingle>
        </form>
      </div>
    </div>
  );
}
