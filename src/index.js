import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {BrowserRouter as Router} from "react-router-dom";
import Store from "./store";

ReactDOM.render(
    <Store>
        <Router>
            <App />
        </Router>
    </Store>,
    document.getElementById("root")
);