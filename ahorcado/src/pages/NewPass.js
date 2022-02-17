import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'reactstrap';
import axios from "axios";
import {urlpass} from "../services/apis";

const url = urlpass;

function RecuperarPass() {

  const [pass, setPass] = useState({
    password: '',
    confirmpass: ''
  });
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);

  const peticionPut = async () => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id');
    setWarning(false);
    if (pass.password === pass.confirmpass) {
      await axios.put(url+id, pass)
        .then(response => {
          console.log("contraseña actualizada: " + response.status);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 4000);
          setTimeout(() => window.location.href="./Login", 2000);
        }).catch(error => {
          console.log(error);
        })
    }else {
      setWarning(true);
      setTimeout(() => setWarning(false), 5000);
    }
    if (pass.password==="" || pass.confirmpass==="") {
      setWarning(false);
    }
    

  }

  const handleChange = e => {
    const { name, value } = e.target;
    setPass({
      ...pass,
      [name]: value
    });
    //console.log(pass);
  }

  const submit = e => {
    e.preventDefault();
  }

  return (
    <form onSubmit={submit}>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <h3>NUEVA CONTRASEÑA</h3>
            <br />


            <div id="passwordHelp" className="form-text text-dark">Por favor escriba una contraseña de 6 a 15 caracteres, al menos una letra mayúscula, minúscula, un dígito, un caracter especial y sin espacios en blanco.</div>
            <br/>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="CONTRASEÑA NUEVA"
              onChange={handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,15}"
              required
            />
            <br />
            <input
              type="password"
              className="form-control"
              name="confirmpass"
              id="newpass"
              placeholder="CONFIRMAR CONTRASEÑA"
              onChange={handleChange}
              required
            />
            <br />
            {warning && <Alert color="info">
              Las contraseñas de los campos no coinciden
            </Alert>}
            {success && <Alert color="success">
              ¡Contraseña actualizada! Por favor inicie sesión.
            </Alert>}
            <br />
            <br />
            <button className="btn btn-block enviar" onClick={() => peticionPut()}>APLICAR</button>
            <br />
            <br />
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecuperarPass;