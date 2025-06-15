"use client";

import { useEffect, useState } from "react";

interface Jugador {
  id: number;
  nombre: string;
  posicion: string;
  edad: number;
  estatura: number;
  peso: number;
  experiencia: number;
  lateralidad: string;
  equipo_id: number | null;
  equipo: string | null;
  nivel: string | null;
}

interface Equipo {
  id: number;
  nombre: string;
  nivel: string;
}

export default function ListadoJugadores() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("todos");

  // Cargar jugadores
  useEffect(() => {
    const fetchJugadores = async () => {
      const res = await fetch("/api/jugadores");
      const data = await res.json();
      setJugadores(data);
    };
    fetchJugadores();
  }, []);

  // Cargar equipos
  useEffect(() => {
    const fetchEquipos = async () => {
      const res = await fetch("/api/equipos");
      const data = await res.json();
      setEquipos(data);
    };
    fetchEquipos();
  }, []);

  // Filtrar jugadores
  const jugadoresFiltrados = jugadores.filter((j) => {
    if (equipoSeleccionado === "todos") return true;
    if (equipoSeleccionado === "sin-equipo") return j.equipo_id === null;
    return j.equipo_id?.toString() === equipoSeleccionado;
  });

  return (
    <div className="container my-5">
      <div className="card shadow rounded">
        <div className="card-body">
          <h2 className="card-title mb-4 display-6">🏐 Listado de Jugadores</h2>

          {/* Selector de equipo */}
          <div className="mb-4">
            <label htmlFor="equipo" className="form-label fw-semibold me-2">
              Filtrar por equipo:
            </label>
            <select
              id="equipo"
              className="form-select w-auto d-inline"
              value={equipoSeleccionado}
              onChange={(e) => setEquipoSeleccionado(e.target.value)}
            >
              <option value="todos">Todos los equipos</option>
              {equipos
                .filter(
                  (equipo) => equipo.nombre.toLowerCase() !== "sin equipo"
                )
                .map((equipo) => (
                  <option key={equipo.id} value={equipo.id.toString()}>
                    {equipo.nombre} {equipo.nivel ? `(${equipo.nivel})` : ""}
                  </option>
                ))}
              <option value="sin-equipo">Sin equipo</option>
            </select>
          </div>

          {/* Tabla de jugadores */}
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Posición</th>
                  <th>Edad</th>
                  <th>Estatura</th>
                  <th>Peso</th>
                  <th>Experiencia</th>
                  <th>Lateralidad</th>
                  <th>Equipo</th>
                  <th>Nivel</th>
                </tr>
              </thead>
              <tbody>
                {jugadoresFiltrados.length > 0 ? (
                  jugadoresFiltrados.map((j) => (
                    <tr key={j.id}>
                      <td>{j.nombre}</td>
                      <td>{j.posicion}</td>
                      <td>{j.edad}</td>
                      <td>{j.estatura}</td>
                      <td>{j.peso}</td>
                      <td>{j.experiencia}</td>
                      <td>{j.lateralidad}</td>
                      <td>{j.equipo || "Sin equipo"}</td>
                      <td>{j.nivel || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center">
                      No hay jugadores para mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
