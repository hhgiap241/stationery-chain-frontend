import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthService from './services/AuthService';
import HttpService from "./services/HttpService";

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => root.render( <App/>
    // <React.StrictMode>
    //     <App/>
    // </React.StrictMode>
);
AuthService.initKeycloak(renderApp);
HttpService.configure();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
