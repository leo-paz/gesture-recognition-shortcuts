import * as React from "react";
import * as ReactDOM from "react-dom";
import Options from "./Options";

const Element = document.createElement("div");
document.body.appendChild(Element);
ReactDOM.render(
  <Options />,
  document.getElementById("options")
);