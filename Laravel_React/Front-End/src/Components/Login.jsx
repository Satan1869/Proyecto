import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [Correo, setCorreo] = useState("");
    const [Clave, setClave] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                Correo,
                Clave,
            });

            if (response.status === 200) {
                const { token, usuario } = response.data;
                localStorage.setItem("token", token);
                localStorage.setItem("usuario", JSON.stringify(usuario));
                toast.success("✅ Inicio de sesión exitoso!");
                setTimeout(() => navigate("/usuarios"), 1500);
            }
        } catch (error) {
            toast.error("❌ Usuario o contraseña incorrectos.");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#1F001F" }}>
            <div className="card p-4 shadow-lg rounded" style={{ width: "50rem", background: "#F0E6FF", boxShadow: "0 4px 10px rgba(128, 0, 128, 0.5)" }}>
                <div className="text-center">
                    <h3 className="fw-bold" style={{ color: "#4B0082", textShadow: "2px 2px 4px rgba(128, 0, 128, 0.3)" }}>Iniciar Sesión</h3>
                    <p className="text-dark">Ingresa tus datos</p>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: "#4B0082" }}>Correo Electrónico</label>
                        <input 
                            type="email" 
                            className="form-control border-dark" 
                            placeholder="usuario@empresa.com"
                            value={Correo} 
                            onChange={(e) => setCorreo(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold" style={{ color: "#4B0082" }}>Contraseña</label>
                        <input 
                            type="password" 
                            className="form-control border-dark" 
                            placeholder="********" 
                            value={Clave} 
                            onChange={(e) => setClave(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: "#800080", color: "#fff", fontWeight: "bold", boxShadow: "0 2px 5px rgba(128, 0, 128, 0.5)" }}>Ingresar</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;