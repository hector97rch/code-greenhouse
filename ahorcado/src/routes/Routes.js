import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

//PAGES:
//Juego:
import Inicio from '../pages/Inicio';
import Ahorcado from '../pages/Ahorcado';

//Control:
import Login from '../pages/Login';
import Registro from '../pages/Registro';
import RecuperarPass from '../pages/RecuperarPass';
import NewPass from '../pages/NewPass';
import Menu from '../pages/Menu';
import Banco from '../pages/Banco';
import Gestores from '../pages/Gestores';
import NotFound from '../pages/NotFound';

function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Inicio}/>
        <Route exact path="/Ahorcado" component={Ahorcado}/>
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Resgitro" component={Registro}/>
        <Route exact path="/Recuperar_Contraseña" component={RecuperarPass}/>
        <Route exact path="/Nueva_Contraseña" component={NewPass}/>
        <Route exact path="/Menu" render={()=> {return !localStorage.getItem("token") ? <Redirect to='/Login'/> : <Menu/> }}/>
        <Route exact path="/Banco_Palabras" render={()=> {return !localStorage.getItem("token") ? <Redirect to='/Login'/> : <Banco/> }}/>
        <Route exact path="/@Admin_Gestores" render={()=> {return !localStorage.getItem("token") ? <Redirect to='/Login'/> : <Gestores/> }}/>
        <Route component={NotFound}/>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
