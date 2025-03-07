import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]); // Todos los productos
  const [productosFiltrados, setProductosFiltrados] = useState([]); // Productos filtrados
  const [terminoBusqueda, setTerminoBusqueda] = useState(""); // Término de búsqueda
  const [showToast, setShowToast] = useState(false); // Estado para controlar la visibilidad del Toast

  // Obtener la lista de productos
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get("http://localhost:8000/api/productos");
        setProductos(respuesta.data);
        setProductosFiltrados(respuesta.data); // Inicialmente, mostrar todos los productos
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  // Función para eliminar un producto
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/productos/eliminar/${id}`);
      // Actualizar la lista de productos después de eliminar
      setProductos(productos.filter((producto) => producto.id !== id));
      setProductosFiltrados(productosFiltrados.filter((producto) => producto.id !== id)); // También actualizar productos filtrados

      // Mostrar el Toast
      setShowToast(true);

      // Ocultar el Toast después de 3 segundos
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Función para manejar la búsqueda en tiempo real
  const handleBusquedaEnTiempoReal = (e) => {
    const termino = e.target.value.toLowerCase();
    setTerminoBusqueda(termino); // Actualizar el término de búsqueda
    filtrarProductos(termino); // Filtrar productos en tiempo real
  };

  // Función para manejar la búsqueda al hacer clic en el botón
  const handleBuscar = (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe
    filtrarProductos(terminoBusqueda); // Filtrar productos con el término actual
  };

  // Función para filtrar productos
  const filtrarProductos = (termino) => {
    const resultados = productos.filter((producto) =>
      producto.Nombre.toLowerCase().includes(termino)
    );
    setProductosFiltrados(resultados); // Actualizar productos filtrados
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de Productos</h2>

      {/* Formulario de búsqueda */}
      <form className="d-flex mb-4" onSubmit={handleBuscar}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar"
          aria-label="Search"
          value={terminoBusqueda}
          onChange={handleBusquedaEnTiempoReal} // Búsqueda en tiempo real
        />
        <button className="btn btn-outline-primary" type="submit">
          Buscar
        </button>
      </form>

      {/* Lista de productos */}
      <div className="row">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="image-container" style={{ height: "200px", overflow: "hidden" }}>
                {producto.Imagen && (
                  <img
                    src={`http://localhost:8000/storage/${producto.Imagen}`}
                    alt={producto.Nombre}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                )}
              </div>
              <div className="card-body">
                <h5 className="card-title">{producto.Nombre}</h5>
                <p className="card-text">${producto.Precio} (Stock: {producto.Stock})</p>
                <p className="card-text">{producto.Descripcion}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarProducto(producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toast de Bootstrap para confirmación de eliminación */}
      <div
        className={`toast align-items-center text-white bg-danger border-0 ${
          showToast ? "show" : ""
        }`}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">
            Producto eliminado exitosamente!
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
            onClick={() => setShowToast(false)}
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ListaProductos;