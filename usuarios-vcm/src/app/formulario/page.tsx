"use client";

import { useState, useEffect } from "react";
import { Equipo } from "../models/equipo";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    posicion: "",
    edad: "",
    estatura: "",
    peso: "",
    experiencia: "",
    lateralidad: "",
    equipo_id: "",
  });

  const [equipos, setEquipos] = useState<Equipo[]>([]);

  useEffect(() => {
    const fetchEquipos = async () => {
      const res = await fetch("/api/equipos");
      const data = await res.json();
      setEquipos(data);
    };
    fetchEquipos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      edad: Number(formData.edad),
      estatura: Number(formData.estatura),
      peso: Number(formData.peso),
      experiencia: Number(formData.experiencia),
      equipo_id: Number(formData.equipo_id),
    };

    const res = await fetch("/api/jugadores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      await Swal.fire({
        icon: "success",
        title: "Jugador añadido correctamente",
        timer: 2000,
        showConfirmButton: false,
      });
      setFormData({
        nombre: "",
        posicion: "",
        edad: "",
        estatura: "",
        peso: "",
        experiencia: "",
        lateralidad: "diestro",
        equipo_id: "",
      });
    } else {
      await Swal.fire({
        icon: "error",
        title: "Error al guardar",
        text: "Por favor, intenta nuevamente.",
      });
    }
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">Añadir Jugador</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label fw-semibold">
                  Nombre
                </label>
                <input
                  id="nombre"
                  className="form-control"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="posicion" className="form-label fw-semibold">
                  Posición
                </label>
                <select
                  id="posicion"
                  className="form-select"
                  name="posicion"
                  value={formData.posicion}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona una posición</option>
                  <option value="opuesto">Opuesto</option>
                  <option value="ala">Ala</option>
                  <option value="central">Central</option>
                  <option value="colocador">Colocador</option>
                  <option value="libero">Libero</option>
                </select>
              </div>

              <div className="col-md-3">
                <label htmlFor="edad" className="form-label fw-semibold">
                  Edad
                </label>
                <input
                  id="edad"
                  className="form-control"
                  name="edad"
                  type="number"
                  placeholder="Edad"
                  value={formData.edad}
                  onChange={handleChange}
                  required
                  min={1}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="estatura" className="form-label fw-semibold">
                  Estatura (cm)
                </label>
                <input
                  id="estatura"
                  className="form-control"
                  name="estatura"
                  type="number"
                  placeholder="Estatura (cm)"
                  value={formData.estatura}
                  onChange={handleChange}
                  required
                  min={50}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="peso" className="form-label fw-semibold">
                  Peso (kg)
                </label>
                <input
                  id="peso"
                  className="form-control"
                  name="peso"
                  type="number"
                  placeholder="Peso (kg)"
                  value={formData.peso}
                  onChange={handleChange}
                  required
                  min={10}
                />
              </div>
              <div className="col-md-3">
                <label htmlFor="experiencia" className="form-label fw-semibold">
                  Años de experiencia
                </label>
                <input
                  id="experiencia"
                  className="form-control"
                  name="experiencia"
                  type="number"
                  placeholder="Experiencia"
                  value={formData.experiencia}
                  onChange={handleChange}
                  required
                  min={0}
                />
              </div>

              <fieldset className="col-md-6">
                <legend className="col-form-label fw-semibold pt-0">
                  Lateralidad
                </legend>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="lateralidad"
                    id="diestro"
                    value="diestro"
                    checked={formData.lateralidad === "diestro"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="diestro">
                    Diestro
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="lateralidad"
                    id="zurdo"
                    value="zurdo"
                    checked={formData.lateralidad === "zurdo"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="zurdo">
                    Zurdo
                  </label>
                </div>
              </fieldset>

              <div className="col-md-6">
                <label htmlFor="equipo_id" className="form-label fw-semibold">
                  Equipo
                </label>
                <select
                  className="form-select"
                  name="equipo_id"
                  value={formData.equipo_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un equipo</option>
                  {equipos.map((equipo) => (
                    <option key={equipo.id} value={equipo.id}>
                      {equipo.nombre} {equipo.nivel ? `(${equipo.nivel})` : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn btn-success w-100 fw-semibold"
                >
                  Agregar Jugador
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
