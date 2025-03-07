import React, { useState } from "react";
import axios from "axios";

const FormularioProducto = () => {
  const [formData, setFormData] = useState({
    Nombre: "",
    Imagen: null,
    Descripcion: "",
    Precio: "",
    Stock: "",
  });

  const [showToast, setShowToast] = useState(false); // Estado para controlar la visibilidad del Toast

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      Imagen: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("Nombre", formData.Nombre);
    data.append("Imagen", formData.Imagen);
    data.append("Descripcion", formData.Descripcion);
    data.append("Precio", formData.Precio);
    data.append("Stock", formData.Stock);

    try {
      const respuesta = await axios.post(
        "http://localhost:8000/api/productos/crear",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(respuesta.data);

      // Mostrar el Toast
      setShowToast(true);

      // Limpiar el formulario después de registrar el producto
      setFormData({
        Nombre: "",
        Imagen: null,
        Descripcion: "",
        Precio: "",
        Stock: "",
      });

      // Ocultar el Toast después de 3 segundos
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Registrar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen:</label>
          <input
            type="file"
            className="form-control"
            name="Imagen"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <textarea
            className="form-control"
            name="Descripcion"
            value={formData.Descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Precio:</label>
          <input
            type="number"
            className="form-control"
            name="Precio"
            value={formData.Precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock:</label>
          <input
            type="number"
            className="form-control"
            name="Stock"
            value={formData.Stock}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar Producto
        </button>
      </form>

      {/* Toast de Bootstrap */}
      <div
        className={`toast align-items-center text-white bg-success border-0 ${
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
            Producto creado exitosamente!
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

export default FormularioProducto;