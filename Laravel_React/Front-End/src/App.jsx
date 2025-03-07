import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Components/Login";
import AgregarUsuario from "./Components/AgregarUsuario";
import Usuario from "./Components/Usuario";
import FormularioProducto from "./Components/FormularioProducto";
import ListaProductos from "./Components/ListaProductos";
import Navbar from "./Components/Navbar"; // Importar la Navbar

function App() {
    const [vista, setVista] = useState("/usuarios");

    return (
        <Router>
            <Routes>
                {/* Ruta de login (sin Navbar) */}
                <Route path="/login" element={<Login />} />

                {/* Rutas protegidas con PrivateRoute */}
                <Route
                    path="/*"
                    element={
                        <PrivateRoute>
                            <Navbar setVista={setVista} />
                            <div className="container mt-4">
                                <Routes>
                                    <Route path="/usuarios" element={<Usuario />} />
                                    <Route path="/registro_usuario" element={<AgregarUsuario />} />
                                    <Route path="/Lista_Productos" element={<ListaProductos />} />
                                    <Route path="/Formulario_Producto" element={<FormularioProducto />} />
                                </Routes>
                            </div>
                            <ToastContainer />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;