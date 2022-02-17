import React from "react";
import ReactDOM from "react-dom";
import Routes from "./routes/Routes";
import 'bootstrap/dist/css/bootstrap.min.css';

//ESTILOS CSS
import './styles/Formulario.css'

//const container = document.getElementById('root')

//ReactDOM.render(QUE, DONDE)
//ReactDOM.render(<Button/>, container)

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);