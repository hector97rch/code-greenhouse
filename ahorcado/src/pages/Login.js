import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { urlsession } from "../services/apis";
import axios from "axios";
import { Alert } from 'reactstrap';

import '../styles/Formulario.css';

const url = urlsession;

function Login() {

  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [warning, setWarning] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  }

  const iniciarSesion = async () => {
    setWarning(false);
    await axios.post(url, user)
      .then(response => {
        if (response.status === 201) {
          localStorage.setItem("token", response.data.access_token);
          //this.props.history.push("./Menu");
          window.location.href = "./Menu"
        }
      }
      ).catch(error => {
        if (error.response.status === 500) {
          setWarning(true);
          setTimeout(() => setWarning(false), 5000);
        }
      })
  }

  const submit = e => {
    e.preventDefault();
  }

  return (
    <form onSubmit={submit}>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <h3>INICIAR SESIÓN</h3>
            <br />
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="CORREO ELECTRÓNICO"
              required
            />

            <br />
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="CONTRASEÑA"
              required
            />
            <br />
            {warning && <Alert color="danger">
              <b>ERROR:</b> Datos incorrectos.
            </Alert>}
            <a href="./Recuperar_Contraseña" className="texto-claro">Olvidé mi contraseña</a>
            <br />
            <br />
            <button className="btn btn-block enviar" onClick={() => iniciarSesion()}>Ingresar</button>
            <br />
            <br />
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;