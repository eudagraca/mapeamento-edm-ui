import React, { useState } from "react";

export default function App() {

  const style = {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0px",
    left: "0px",
  };

  return (
    <div>
      <div className="uk-background-primary uk-padding">
        <img
          className="custom-logo"
          src="/images/logo.PNG"
          width="100"
          height="100"
          alt=""
        />

        <h3 className="uk-text-white uk-margin-large-left  uk-margin-top uk-margin-large-bottom">
          Portal de mapeamento da rede da Electricidade de Moçambique
        </h3>
        <div className="uk-child-width-1-4@m uk-grid-match uk-grid uk-flex uk-flex-center">
          <div className="uk-card uk-card-secondary uk-margin-right uk-card-body uk-border-rounded">
            <h5 className="uk-text-bold uk-margin-remove">Clientes</h5>
            <p className="uk-text-primary uk-text-small uk-margin-remove">
              Mapeie os clientes da EDM
              <a style={style} href="consumidores"></a>
            </p>
          </div>

          <div className="uk-card uk-card-secondary uk-margin-right uk-card-body uk-border-rounded">
            <h5 className="uk-text-bold uk-margin-remove">Transformadores</h5>
            <h5 className="uk-text-primary uk-text-small uk-margin-remove">
              Mapeie os clientes da EDM
              <a style={style} href="transformadores"></a>
            </h5>
          </div>
{/* 
          <div className="uk-card uk-card-secondary uk-margin-right uk-card-body uk-border-rounded">
            <h5 className="uk-text-bold uk-margin-remove">Areas Geograficas</h5>
            <p className="uk-text-primary uk-text-small uk-margin-remove">
              Mapeie os clientes da EDM
              <a style={style} href="areas"></a>
            </p>
          </div> */}
        </div>
      </div>

      <div className="uk-flex uk-flex-center">
        <img
          className="custom-logo"
          src="/images/logo.PNG"
          width="250"
          height="250"
          alt=""
        />
      </div>
    </div>
  );
}
