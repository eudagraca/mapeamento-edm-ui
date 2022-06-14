import React from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import Header from "./Header";
import { useState, useEffect } from "react";
import { baseUrl } from "./utils";
import { columnsCustomer } from "./data";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

function TransformadoresDetails() {
  const [consumidores, setConsumidores] = useState([]);
  const [tranformador, setTransformador] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const data = [];
  const onRowClicked = (row, event) => {
    window.open("/consumidor/" + row.id, "_self");
  };

  let { id } = useParams();

  useEffect(() => {
    const getPT = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl()}/tranformador/${id}`);
        const data = await response.json();
        setTransformador(data)
        // console.log(data)
        
      } catch (error) {
        console.error(error);
      }
    };
    getPT();


    const getClients = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch(
          `${baseUrl()}/consumidor/${id}/transformador`
        );
        const responseData = await response.json();
        setConsumidores(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getClients();
  }, []);

  for (const d of consumidores) {
    data.push({
      id: d.id,
      nome: d.nome,
      contador: d.contador,
      is_validated: d.is_validated ? "Validado" : "Não válidado",
      data_registo: d.data_registo,
      transformador: d.transformador.potencia,
    });
  }
  const tableData = {
    columns: columnsCustomer,
    data,
  };
  return (
    <div>
      {isLoading ? <Spinner /> : ""}

      <Header />
      <div className="uk-background-default uk-padding-large">
        <h3 className="uk-margin-large-top uk-text-bolder uk-text-italic">
          Lista de Clientes associados ao PT {tranformador.potencia} Versão {tranformador.versao}
        </h3>
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

export default TransformadoresDetails;
