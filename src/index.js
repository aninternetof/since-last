import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

import registerServiceWorker from "./registerServiceWorker";

const config = {
  apiKey: "AIzaSyBYXe4zNizE7cHJMEcyfxAof40YkZ-Bjhk",
  authDomain: "sincelast-56533.firebaseapp.com",
  projectId: "sincelast-56533",
  storageBucket: "sincelast-56533.appspot.com",
  messagingSenderId: "779277243443",
  appId: "1:779277243443:web:27f40f8b69a339884fbf46",
};

firebase.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

registerServiceWorker();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
