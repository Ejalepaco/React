import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Obtener todos los jugadores con su equipo y nivel
export async function GET() {
  const [rows] = await db.query(`
  SELECT 
    j.id, j.nombre, j.posicion, j.edad, j.estatura, j.peso, 
    j.experiencia, j.lateralidad,
    j.equipo_id,
    e.nombre AS equipo,
    n.nombre AS nivel
  FROM jugadores j
  LEFT JOIN equipos e ON j.equipo_id = e.id
  LEFT JOIN niveles n ON e.nivel_id = n.id
  ORDER BY j.id DESC
`);

  return NextResponse.json(rows);
}

// Insertar nuevo jugador
export async function POST(request: Request) {
  const data = await request.json();
  const {
    nombre,
    posicion,
    edad,
    estatura,
    peso,
    experiencia,
    lateralidad,
    equipo_id,
  } = data;

  await db.query(
    `INSERT INTO jugadores 
     (nombre, posicion, edad, estatura, peso, experiencia, lateralidad, equipo_id)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      nombre,
      posicion,
      edad,
      estatura,
      peso,
      experiencia,
      lateralidad,
      equipo_id,
    ]
  );

  return NextResponse.json({ mensaje: "Jugador añadido con éxito" });
}
