import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query(`
    SELECT 
      j.id,
      j.nombre,
      j.posicion,
      j.edad,
      j.estatura,
      j.peso,
      j.experiencia,
      j.lateralidad,
      j.equipo_id,
      e.nombre AS equipo,
      e.nivel AS nivel
    FROM jugadores j
    LEFT JOIN equipos e ON j.equipo_id = e.id
    ORDER BY j.nombre ASC
  `);

  return NextResponse.json(rows);
}
