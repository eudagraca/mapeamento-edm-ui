import React from "react";

export const columnsCustomer = [
  {
    name: "NOME DO CLIENTE",
    selector: row => row.nome,
    sortable: true,
  },
  {
    name: "CONTADOR",
    selector: row => row.contador,
    sortable: true,
  },
  {
    name: "FOI VALIDADO",
    selector: row => row.is_validated,
    sortable: true,
    // cell: d => <span>{d.genres.join(", ")}</span>
  },
  {
    name: "DATA DE REGISTO",
    selector: row => row.data_registo,
    sortable: true,
  },
  {
    name: "Transformador",
    selector: row => row.transformador,
    sortable: true,
  },
];



export const columnsPT = [
  {
    name: "Codigo do PT",
    selector: row => row.cod_pt,
    sortable: true,
  },
  {
    name: "Potência",
    selector: row => row.potencia,
    sortable: true,
  }, {
    name: "Código SE",
    selector: row => row.cod_se,
    sortable: true,
  },
  {
    name: "FOI VALIDADO",
    selector: row => row.is_validated,
    sortable: true,
    // cell: d => <span>{d.genres.join(", ")}</span>
  },
  {
    name: "DATA DE REGISTO",
    selector: row => row.created_at,
    sortable: true,
  },
  {
    name: "Bairro",
    selector: row => row.bairro,
    sortable: true,
  }, {
    name: "Provincia",
    selector: row => row.provincia,
    sortable: true,
  },
];


export default function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month, year, ].join('-');
}