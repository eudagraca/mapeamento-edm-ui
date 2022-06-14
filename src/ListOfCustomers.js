import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import { baseUrl } from "./utils";
import { columnsCustomer } from "./data";

function ListCustomers() {
  const [consumidores, setConsumidores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = [];
  const onRowClicked = (row, event) => { 
    window.open("/transformador/"+row.transformador_id,"_self");
  };

  useEffect(() => {
    const getTransforms = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl()}/consumidor`);
        const responseData = await response.json();
        setConsumidores(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getTransforms();
  }, []);
  for (const d of consumidores) {
    data.push({
      id: d.id,
      nome: d.nome,
      contador: d.contador,
      is_validated: d.is_validated ? "Validado" : "Não válidado",
      data_registo: d.data_registo,
      transformador: d.transformador.cod_se,
      transformador_id: d.transformador.id,
    });
  }
  const tableData = {
    columns: columnsCustomer,
    data,
  };
  return (
    <div>
      <Header />
      

      <div className="uk-background-default uk-padding-large">
        <h3 className="uk-margin-large-top uk-text-bolder uk-text-italic">
          Lista de Clientes
        </h3>
        <div className="uk-width-1-1@s uk-padding-remove uk-margin-large-right uk-margin-large-bottom">
              <a className="uk-margin-medium-right uk-align-right uk-button uk-button-text" href="/consumidor">
                Registar novo cliente
              </a>
            </div>
        <DataTableExtensions {...tableData}>
        <DataTable
          columns={columnsCustomer}
          data={data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          onRowClicked={onRowClicked}
          highlightOnHover
        />
        </DataTableExtensions>
      </div>
    </div>
  );
}

export default ListCustomers;
