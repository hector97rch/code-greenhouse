import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { urlreqpass, urlusers } from "../services/apis";
import { Alert, Spinner } from 'reactstrap';
import { BsCheckLg } from "react-icons/bs";

const url = urlreqpass;

function RecuperarPass() {

  const [email, setEmail] = useState({
    email: ''
  });
  const [tablaGestores, setTablaGestores] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState(false);
  const [error500, setError500] = useState(false);
  const [botonActivo, setBotonActivo] = useState(true);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);

  const enviarCorreo = async () => {
    setLoading(false);
    setCheck(false);
    setSuccess(false);
    setWarning(false);
    setError500(false);
    if (email.email === "") {
      console.log("campos vacíos");
    } else {
      if (gestores.length > 0) {
        let id = gestores[0].id;
        await axios.post(url + id, email)
          .then(response => {
            console.log("correo enviado: " + response.status);
            setSuccess(true);
            setBotonActivo(false);
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
            setTimeout(() => setCheck(true), 3000);
          }).catch(error => {
            console.log(error);
            if (error.response.status === 500) {
              setError500(true);
              setTimeout(() => setError500(false), 5000);
            }
          })
      } else {
        setSuccess(false);
        setWarning(true);
        setTimeout(() => setWarning(false), 5000);
      }
    }
  }

  const filtrar = (terminoBusqueda) => {
    var resultadosBusqueda = tablaGestores.filter((elemento) => {
      if (elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
      return resultadosBusqueda;
    });
    setGestores(resultadosBusqueda);
  }

  const peticionGet = async () => {
    await axios.get(urlusers)
      .then(response => {
        setTablaGestores(response.data);
      }).catch(error => {
        console.log(error);
        console.log(error.response);
      })
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setEmail({
      ...email,
      [name]: value
    });
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const submit = e => {
    e.preventDefault();
  }

  useEffect(() => {
    peticionGet();
  }, []);

  return (
    <form onSubmit={submit}>
      <div className="containerPrincipal">
        <div className="containerSecundario">
          <div className="form-group">
            <h3>RECUPERAR CONTRASEÑA</h3>
            <br />
            <p className="texto-claro">
              Se te hará llegar un correo en el cual podrás recuperar tu contraseña, favor de ingresar tu correo electrónico con el cual estás registrado.
            </p>
            <br />
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              onChange={handleChange}
              value={busqueda}
              placeholder="CORREO ELECTRÓNICO"
              required
            />
            <br />
            {success &&
              <Alert color="success"><b>¡CORREO ENVIADO!</b> Para continuar, verifique en su bandeja del correo y siga los pasos adjuntos.</Alert>}
            {warning &&
              <Alert color="warning"><b>AVISO:</b> El correo especificado no está registrado.</Alert>}
            {error500 &&
              <Alert color="danger"><b>ERROR AL ENVIAR:</b> porfavor verifique que el correo esté escrito correctamente.</Alert>}
            <br />
            <button className="btn btn-block enviar" onClick={() => enviarCorreo()} disabled={!botonActivo}>
              {loading && <Spinner size="sm" />}
              {check && <BsCheckLg />}
              Enviar
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    </form>
  );
}

export default RecuperarPass;