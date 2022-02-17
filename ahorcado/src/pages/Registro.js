import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Registro extends Component {

    registrarse=async()=>{
        window.location.href="./Menu";
    }

    render(){
        return (
            <div className="containerPrincipal">
            <div className="containerSecundario">
              <div className="form-group">
                <h3>REGISTRARSE</h3>
                  <br />  
                <input
                  type="email"
                  className="form-control"
                  name="correo"
                  onChange={this.handleChange}
                  placeholder="CORREO ELECTRÓNICO"
                  required
                />
                <br />
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="CONTRASEÑA"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}"
                  title="La contraseña debe de tener minimo 8 caracteres y maximo 15" required
                />
                <br />
                <br />
                <button className="btn btn-block enviar" onClick={()=> this.registrarse()}>Enviar</button>
                <br />
                <br />
              </div>
            </div>
          </div>);
    }
}

export default Registro;