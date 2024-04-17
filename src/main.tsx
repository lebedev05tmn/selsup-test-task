import React from "react";
import ReactDOM from "react-dom/client";
import ParamEditor from "./param-editor";
const params = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];

const model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
};
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ParamEditor params={params} model={model} />
  </React.StrictMode>
);
