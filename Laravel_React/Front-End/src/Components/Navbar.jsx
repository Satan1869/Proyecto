import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Eliminar el token de sesión
        navigate("/login"); // Redirigir a la pantalla de login
    };

    return (
        <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#0f0', boxShadow: '0 4px 10px rgba(0, 255, 0, 0.5)' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{ color: '#000', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 255, 0, 0.8)' }}>Gestión</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon" style={{ filter: 'invert(0%)', backgroundColor: '#000', borderRadius: '5px' }}></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => navigate("/usuarios")} style={{ color: '#000', fontWeight: 'bold', padding: '10px', borderRadius: '5px', backgroundColor: '#0f0', boxShadow: '0 2px 5px rgba(0, 255, 0, 0.5)' }}>Ver Usuarios</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => navigate("/registro_usuario")} style={{ color: '#000', fontWeight: 'bold', padding: '10px', borderRadius: '5px', backgroundColor: '#0f0', boxShadow: '0 2px 5px rgba(0, 255, 0, 0.5)' }}>Registrar Usuario</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => navigate("/Lista_Productos")} style={{ color: '#000', fontWeight: 'bold', padding: '10px', borderRadius: '5px', backgroundColor: '#0f0', boxShadow: '0 2px 5px rgba(0, 255, 0, 0.5)' }}>Catálogo Productos</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => navigate("/Formulario_Producto")} style={{ color: '#000', fontWeight: 'bold', padding: '10px', borderRadius: '5px', backgroundColor: '#0f0', boxShadow: '0 2px 5px rgba(0, 255, 0, 0.5)' }}>Registrar Producto</button>
                        </li>
                    </ul>
                    <button className="btn" onClick={handleLogout} style={{ backgroundColor: '#0a0', color: '#fff', fontWeight: 'bold', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 255, 0, 0.5)' }}>
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
