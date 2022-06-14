import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import { baseUrl } from "./utils";
import formatDate, { columnsPT } from "./data";

function ListPT() {
  const [transformares, setTransformadores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = [];

  const onRowClicked = (row, event) => {
    window.open("/transformador/" + row.id, "_self");
  };
  useEffect(() => {
    const getTransforms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl()}/transformador`);
        const responseData = await response.json();
        setTransformadores(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getTransforms();
  }, []);

  for (const tranformador of transformares) {
    data.push({
      id: tranformador.id,
      cod_pt: `${tranformador.cod_pt} `,
      cod_se: `${tranformador.cod_se} `,
      potencia: `${tranformador.potencia} `,
      is_validated: tranformador.is_validated ? "Validado" : "Não válidado",
      created_at: tranformador.created_at
        ? formatDate(tranformador.created_at)
        : "NA",
      bairro: `${tranformador.local.bairro}`,
      provincia: `${tranformador.local.provincia}`,
    });
  }
  const tableData = {
    columns: columnsPT,
    data,
  };

  return (
    <div>
      <Header />


      <div className="uk-background-default uk-padding-large">
        <h3 className="uk-margin-large-top uk-text-bolder uk-text-italic">
          Lista de transformares de tensão
        </h3>
        <div className="uk-width-1-1@s uk-padding-remove uk-margin-large-right uk-margin-large-bottom">
        <a
          className="uk-margin-medium-right uk-align-right uk-button uk-button-text"
          href="/transformador"
        >
          Registar novo transformador
        </a>
      </div>
        <DataTableExtensions {...tableData}>
          <DataTable
            columns={columnsPT}
            data={data}
            noHeader
            defaultSortField="id"
            defaultSortAsc={false}
            onRowClicked={onRowClicked}
            pagination
            highlightOnHover
          />
        </DataTableExtensions>
      </div>
    </div>
  );
}

export default ListPT;
