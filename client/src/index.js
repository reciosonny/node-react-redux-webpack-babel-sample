import ReactDOM from "react-dom";
import React from "react";
import { Provider } from "react-redux";

import configureStore from "../store/configureStore";
import App from "./Components/App";

import "./style.scss";

const store = configureStore({});

const AppRender = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

if (module.hot) {
  console.log("hot module!");
}

ReactDOM.render(<AppRender />, document.getElementById("root"));
