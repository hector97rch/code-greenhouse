import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { MdLogout, MdNoteAlt } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsCheckLg, BsXLg } from "react-icons/bs";
import axios from "axios";
import { urlsessiondelete } from "../services/apis";

const url = urlsessiondelete;

function Navbar() {

    const [modalSalir, setModalSalir] = useState(false);

    const openModalSalir = () => {
        setModalSalir(!modalSalir);
    }

    const CerrarSesion = async () => {
        const token = localStorage.getItem("token");
        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${token}`;
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        await axios.post(url)
            .then(response => {
                localStorage.removeItem("token");
                window.location.href = "./Login";
            }
            ).catch(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-warning">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="./Banco_Palabras">   <MdNoteAlt />   BANCO DE PALABRAS</Link>
                            </li>
                            <li className="nav-item" hidden={false}>
                                <Link className="nav-link active" aria-current="page" to="./@Admin_Gestores">   <FaUserAlt />   GESTORES</Link>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link active salir-nav" onClick={() => openModalSalir()}><MdLogout />   SALIR</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Modal isOpen={modalSalir}>
                <ModalBody color="dark">
                    ¿Estás seguro que deseas salir de la sesión?
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={() => CerrarSesion()}><BsCheckLg />   Sí</Button>
                    <Button color="danger" onClick={() => openModalSalir()}><BsXLg />   No</Button>
                </ModalFooter>
            </Modal>
        </div>
    )

}

export default Navbar;