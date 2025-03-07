import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api/usuarios"; // Asegúrate de que la URL es correcta

const Usuario = () => {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        obtenerUsuarios();
    }, []);

    const obtenerUsuarios = async () => {
        try {
            const respuesta = await axios.get(API_URL);
            setUsuarios(respuesta.data);
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };

    const eliminarUsuario = async (Id) => {
        if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;

        try {
            await axios.delete(`${API_URL}/${Id}`);
            setUsuarios(usuarios.filter(usuario => usuario.Id !== Id));
            toast.success("Usuario eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            toast.error("No se pudo eliminar el usuario");
        }
    };

    return (
        <div className="container py-5">
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-primary mb-4">Lista de Usuarios</h2>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario.Id}>
                                    <td>{usuario.Id}</td>
                                    <td>{usuario.NombreUsuario}</td>
                                    <td>{usuario.Correo}</td>
                                    <td className="text-center">
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => eliminarUsuario(usuario.Id)}
                                        >
                                            ❌ Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Usuario;
