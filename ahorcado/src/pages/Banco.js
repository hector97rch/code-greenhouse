import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { urlwords } from "../services/apis";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, ModalBody, ModalHeader, ModalFooter, Alert } from 'reactstrap';
import axios from "axios";

import '../styles/Menu.css'

//Icons:
import { BsFillCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { MdCancel, MdEdit, MdAddCircle, MdAutorenew } from "react-icons/md";

const url = urlwords;

function Banco() {

    const [palabras, setPalabras]= useState([]);
    const [palabraSeleccionada, setPalabraSeleccionada]=useState({
        id: '',
        palabra:'',
        descripcion:''
    })
    const [tablaPalabras, setTablaPalabras]= useState([]);
    const [busqueda, setBusqueda]= useState("");
    const [modalInsertar, setModalInsertar]=useState(false);
    const [modalEditar, setModalEditar]=useState(false);
    const [modalEliminar, setModalEliminar]=useState(false);
    const [noPalabrasError, setPalabrasError] = useState(false);
    const [warning, setWarning] = useState(false);

    const peticionGet = async() => {
        await axios.get(url)
        .then(response => {
            setPalabras(response.data);
            setTablaPalabras(response.data);
            setPalabrasError(false);
        }).catch(error => {
            console.log(error);
            console.log(error.response);
            if (error.response.status === 500) {
                setPalabrasError(true);
            }
        })
    }

    const peticionPost = async () => {
        await axios.post(url, palabraSeleccionada)
        .then(response => {
            setPalabras(palabras.concat(response.data));
            openModalInsertar();
            peticionGet();
        }).catch(error => {
            console.log(error);
            if(error.response.status===500){
                setWarning(true);
                setTimeout(() => setWarning(false), 5000);
            }
        })
    }

    const peticionPut = async () => {
        await axios.put(url+palabraSeleccionada.id, palabraSeleccionada)
        .then(response => {
            var respuesta=response.data;
            var dataAuxiliar=palabras;
            dataAuxiliar.map(palabra=>{
                if(palabra.id===palabraSeleccionada.id){
                    palabra.palabra=respuesta.palabra;
                    palabra.descripcion=respuesta.descripcion;
                }
                return peticionGet();
            });
            openModalEditar();
        }).catch(error => {
            console.log(error);
        })
    }

    const peticionDelete = async () => {
        await axios.delete(url+palabraSeleccionada.id)
        .then(response => {
            setPalabras(palabras.filter(palabra=>palabra.id!==response.data));
            openModalEliminar();
            window.location.href = "./Banco_Palabras";
        }).catch(error => {
            console.log(error);
        })
    }

    const SearchHandleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }

      const filtrar=(terminoBusqueda)=>{
        var resultadosBusqueda=tablaPalabras.filter((elemento)=>{
          if(elemento.palabra.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          || elemento.descripcion.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
          ){
            return elemento;
          }
          return resultadosBusqueda;
        });
        setPalabras(resultadosBusqueda);
      }

      const seleccionarPalabra=(palabra, caso)=>{
          setPalabraSeleccionada(palabra);
          (caso==="Editar")?
          openModalEditar(): openModalEliminar();
      }

      const handleChange=e=>{
        const {name, value}=e.target;
        setPalabraSeleccionada({
            ...palabraSeleccionada,
            [name]:value
        });
        console.log(palabraSeleccionada);
      }

    useEffect(() => {
        peticionGet();
      }, []); 

    const openModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const openModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const openModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

        return (
            <div>
                <Navbar />
                <div>
                <nav className="navbar navbar-light">
                    <div className="container-fluid">
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Buscar palabra..." value={busqueda} onChange={SearchHandleChange} />
                        </form>
                    </div>
                </nav>
            </div>

                <div className="crud">
                    <br />
                    <Button color="success" onClick={()=>openModalInsertar()}><MdAddCircle />   Agregar Palabra</Button>
                    <br /><br />
                    <Table className="table-hover">
                        <thead className="bg-light">
                            <tr>
                                <th>Palabra</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {palabras.map(palabra => {
                                return (
                                    <tr key={palabra.id}>
                                        <td>{palabra.palabra}</td>
                                        <td>{palabra.descripcion}</td>
                                        <td>
                                            <Button color="primary" onClick={()=>seleccionarPalabra(palabra, "Editar")}><MdEdit />   Editar</Button>
                                            {"   "}
                                            <Button color="danger" onClick={()=>seleccionarPalabra(palabra, "Eliminar")}><BsFillTrashFill />   Eliminar</Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                    {noPalabrasError &&
                            <Alert color="light">No hay palabras registradas.</Alert>}

                    <Modal isOpen={modalInsertar}>
                        <ModalHeader style={{ display: 'block' }}>
                            Agregar nueva palabra
                        </ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <br />
                                <label htmlFor="palabra">Palabra</label>
                                <input className="form-control" type="text" name="palabra" id="palabra" onChange={handleChange} />
                                <br />
                                <label htmlFor="descripcion">Descripcion</label>
                                <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={handleChange} />
                                <br />
                                {warning &&
                            <Alert color="warning"><b>AVISO:</b> Favor de llenar ambos campos.</Alert>}
                            </div>
                        </ModalBody>

                        <ModalFooter>
                                <Button color="success" onClick={() =>peticionPost()}><BsFillCheckCircleFill />   Insertar
                                </Button>
                            <Button className="btn btn-danger" onClick={()=>openModalInsertar()}><MdCancel />   Cancelar</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEditar}>
                        <ModalHeader style={{ display: 'block' }}>
                            Editar palabra
                        </ModalHeader>
                        <ModalBody>
                            <div className="form-group">
                                <br />
                                <label htmlFor="palabra">Palabra</label>
                                <input className="form-control" type="text" name="palabra" id="palabra" onChange={handleChange} value={palabraSeleccionada && palabraSeleccionada.palabra}/>
                                <br />
                                <label htmlFor="descripcion">Descripcion</label>
                                <input className="form-control" type="text" name="descripcion" id="descripcion" onChange={handleChange} value={palabraSeleccionada && palabraSeleccionada.descripcion} />
                                <br />
                            </div>
                        </ModalBody>

                        <ModalFooter>
                                <Button color="primary" onClick={() =>peticionPut()}><MdAutorenew/>   Editar
                                </Button>
                            <Button className="btn btn-danger" onClick={()=>openModalEditar()}><MdCancel />   Cancelar</Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalEliminar}>
                        <ModalBody>
                            ¿Estás seguro que deseas eliminar a la palabra "{palabraSeleccionada && palabraSeleccionada.palabra}" ?
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
export default Banco;
