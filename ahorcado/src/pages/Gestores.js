import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { urlusers } from "../services/apis";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Alert, Spinner } from 'reactstrap';
import axios from "axios";

import '../styles/Menu.css'

//Icons:
import { BsFillTrashFill, BsFillCaretDownFill } from "react-icons/bs";
import { MdCancel, MdEdit, MdAddCircle, MdAutorenew, MdMarkEmailRead } from "react-icons/md";

const url = urlusers;

function Gestores() {

    const [gestores, setGestores] = useState([]);
    const [gestorSeleccionado, setGestorSeleccionado] = useState({
        id: '',
        name: '',
        email: ''
    })
    const [tablaGestores, setTablaGestores] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [botonActivo, setBotonActivo] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const [error, setError] = useState(false);
    const [warning, setWarning] = useState(false);
    const [noGestoresError, setGestoresError] = useState(false);

    const peticionGet = async () => {
        await axios.get(url)
            .then(response => {
                setGestoresError(false);
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].estado === true) {
                        response.data[i].estado = "Activo"
                    } else {
                        response.data[i].estado = "En espera"
                    }
                }
                setGestores(response.data);
                setTablaGestores(response.data);
            }).catch(error => {
                console.log(error);
                console.log(error.response);
                if (error.response.status === 400) {
                    setGestoresError(true);
                }
            })
    }

    const peticionPost = async () => {
        delete gestorSeleccionado.id;
        setBotonActivo(false);
        setError(false);
        setWarning(false);
        await axios.post(url, gestorSeleccionado)
            .then(response => {
                setGestores(gestores.concat(response.data));
                openModalInsertar();
                peticionGet();
                setBotonActivo(true);
            }).catch(error => {
                console.log(error);
                console.log(error.response.status);
                if (error.response.status === 500) {
                    setWarning(true);
                    setTimeout(() => setWarning(false), 5000);
                    setBotonActivo(true);
                } if (error.response.status === 400) {
                    setError(true);
                    setTimeout(() => setError(false), 5000);
                    setBotonActivo(true);
                }
            })
    }

    const peticionPut = async () => {
        setWarning(false);
        await axios.put(url + gestorSeleccionado.id, gestorSeleccionado)
            .then(response => {
                var respuesta = response.data;
                var dataAuxiliar = gestores;
                dataAuxiliar.map(gestor => {
                    if (gestor.id === gestorSeleccionado.id) {
                        gestor.name = respuesta.name;
                    }
                    return peticionGet();
                });
                openModalEditar();
            }).catch(error => {
                console.log(error);
                console.log(error.response.status);
                if (error.response.status === 400) {
                    setWarning(true);
                    setTimeout(() => setWarning(false), 5000);
                    setBotonActivo(true);
                }
            })
    }

    const peticionDelete = async () => {
        await axios.delete(url + gestorSeleccionado.id)
            .then(response => {
                setGestores(gestores.filter(gestor => gestor.id !== response.data));
                openModalEliminar();
                window.location.href = "./@Admin_Gestores";
            }).catch(error => {
                console.log(error);
            })
    }

    const SearchHandleChange = e => {
        setBusqueda(e.target.value);
        filtrar(e.target.value);
    }

    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaGestores.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.email.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.estado.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
            ) {
                return elemento;
            }
            return resultadosBusqueda;
        });
        setGestores(resultadosBusqueda);
    }

    const filtrarActivo = () => {
        const resultadosActivo = query => {
            return tablaGestores.filter((result) =>
                result.estado.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }
        setGestores(resultadosActivo('Activo'));
    }

    const filtrarEspera = () => {
        const resultadosActivo = query => {
            return tablaGestores.filter((result) =>
                result.estado.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
            );
        }
        setGestores(resultadosActivo('En espera'));
    }

    const seleccionarGestor = (gestor, caso) => {
        setGestorSeleccionado(gestor);
        (caso === "Editar") ?
            openModalEditar() : openModalEliminar();
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setGestorSeleccionado({
            ...gestorSeleccionado,
            [name]: value
        });
        console.log(gestorSeleccionado);
    }

    useEffect(() => {
        peticionGet();
    }, []);

    const openModalInsertar = () => {
        setModalInsertar(!modalInsertar);
        setBotonActivo(true);
        setError(false);
        setWarning(false);
    }

    const openModalEditar = () => {
        setModalEditar(!modalEditar);
        setWarning(false);
    }

    const openModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const openDropdown = () => {
        setDropdown(!dropdown);
    }

    return (
        <div>
            <Navbar />
            <div>
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Buscar gestor..." value={busqueda} onChange={SearchHandleChange} />
                        </form>
                    </div>
                </nav>
            </div>

            <div className="crud">
                <br />
                <Button color="success" onClick={() => openModalInsertar()}><MdAddCircle />   Agregar Gestor</Button>
                <br /><br />
                <Table className="table-hover">
                    <thead className="bg-light">
                        <tr>
                            <th>Nombre de usuario</th>
                            <th>Correo Electrónico</th>
                            <th>Estado</th>
                            <th><Dropdown isOpen={dropdown} toggle={openDropdown} size="sm">
                                <DropdownToggle className="dropdown">
                                    <BsFillCaretDownFill color="black" />
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem header>Filtrar por:</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => peticionGet()}>Todos</DropdownItem>
                                    <DropdownItem onClick={() => filtrarActivo()}>Activo</DropdownItem>
                                    <DropdownItem onClick={() => filtrarEspera()}>En espera</DropdownItem>
                                </DropdownMenu>
                            </Dropdown></th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            gestores.map(gestor => {
                                return (
                                    <tr key={gestor.id}>
                                        <td>{gestor.name}</td>
                                        <td>{gestor.email}</td>
                                        <td>{gestor.estado.toString()}</td>
                                        <td></td>
                                        <td>
                                            <Button color="primary" onClick={() => seleccionarGestor(gestor, "Editar")}><MdEdit />   Editar</Button>
                                            {"   "}
                                            <Button color="danger" onClick={() => seleccionarGestor(gestor, "Eliminar")}><BsFillTrashFill />   Eliminar</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </Table>
                {noGestoresError &&
                    <Alert color="light">No hay usuarios gestores registrados.</Alert>}

                <Modal isOpen={modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        Invitar usuario nuevo
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <br />
                            <label htmlFor="name">Nombre de usuario:</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={handleChange} />
                            <br />
                            <label htmlFor="email">Correo electrónico:</label>
                            <input className="form-control" type="email" name="email" id="email" onChange={handleChange} />
                            <br />
                            {warning &&
                                <Alert color="warning"><b>AVISO:</b> Favor de llenar ambos campos.</Alert>}
                            {error &&
                                <Alert color="danger">El correo que intentas agregar ya fue registrado previamente.</Alert>}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="success" disabled={!botonActivo} onClick={() => peticionPost()}>
                            {!botonActivo && <Spinner size="sm" />}
                            <MdMarkEmailRead />
                            Agregar
                        </Button>
                        <Button className="btn btn-danger" disabled={!botonActivo} onClick={() => openModalInsertar()}><MdCancel />   Cancelar</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalEditar}>
                    <ModalHeader style={{ display: 'block' }}>
                        Editar Gestor
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <br />
                            <label htmlFor="name">Nombre de usuario:</label>
                            <input className="form-control" type="text" name="name" id="name" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.name} />
                            <br />
                            <label htmlFor="email">Correo electrónico:</label>
                            <input className="form-control" type="email" name="email" id="email" onChange={handleChange} value={gestorSeleccionado && gestorSeleccionado.email} readOnly />
                            <br />
                            {warning &&
                                <Alert color="warning"><b>AVISO:</b> Favor de escribir algo en el campo <u><b>Nombre de usuario</b></u>.</Alert>}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => peticionPut()}><MdAutorenew />   Editar
                        </Button>
                        <Button className="btn btn-danger" onClick={() => openModalEditar()}><MdCancel />   Cancelar</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={modalEliminar}>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar al gestor <b>"{gestorSeleccionado && gestorSeleccionado.name}"</b> ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={() => peticionDelete()}>Sí</Button>
                        <Button color="secondary" onClick={() => openModalEliminar()}>No</Button>
                    </ModalFooter>
                </Modal>

            </div>
        </div>


    );
}
export default Gestores;