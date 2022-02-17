import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

class Inicio extends Component {
    iniciar=async()=>{
        window.location.href="./Ahorcado";
    }
    
    render(){
        return (
            <div className="containerPrincipal">
            <div className="containerSecundario">
              <div className="form-group">
                  <h3>DIFICULTAD</h3>
                  <br />
                  
                  <div>
                    <input type="radio" id="difficultChoice1"
                    name="easy" value="easy"/>
                    <label for="difficultChoice1">FÁCIL</label>
                    <br />
                    <input type="radio" id="difficultChoice2"
                    name="hard" value="hard"/>
                    <label for="difficultChoice2">DIFICIL</label>
                  
                  </div>
                  <br />
                
                <br />
                <button className="btn btn-block iniciar" onClick={()=> this.iniciar()}>¡A JUGAR!</button>
                
              </div>
            </div>
          </div>);
    }
}

export default Inicio;