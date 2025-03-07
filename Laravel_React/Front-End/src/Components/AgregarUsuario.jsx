import { useState } from "react";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:8000/api/usuarios";

const AgregarUsuario = () => {
    const [formData, setFormData] = useState({
        NombreUsuario: "",
        Correo: "",
        Clave: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.Clave.length < 1) {
            toast.error("La clave debe tener al menos 1 carácter");
            return;
        }
        
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Usuario registrado correctamente");
                setFormData({ NombreUsuario: "", Correo: "", Clave: "" });
            } else {
                toast.error(data.error || "Error al registrar usuario");
            }
        } catch (error) {
            toast.error("Error de conexión con el servidor");
        }
    };

    return (
        <div className="full-screen-center">
        <div className="card-custom">
            <h2 className="text-center mb-4">Registrar Usuario</h2>    
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input
                            type="text"
                            name="NombreUsuario"
                            placeholder="Usuario"
                            value={formData.NombreUsuario}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            name="Correo"
                            placeholder="Correo"
                            value={formData.Correo}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Clave</label>
                        <input
                            type="password"
                            name="Clave"
                            placeholder="Clave"
                            value={formData.Clave}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default AgregarUsuario;
