import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";

function Menu() {
        return (
            <div>
            <Navbar/>
            <div className="containerLogo">
            <img src='./icons/GreenHouseLogo.png' width="941" height="193" alt="" ></img>
            </div>
            </div>
        )
}

export default Menu;

