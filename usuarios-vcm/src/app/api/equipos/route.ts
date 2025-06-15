import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query(`
    SELECT e.id, e.nombre, n.nombre AS nivel
    FROM equipos e
    LEFT JOIN niveles n ON e.nivel_id = n.id
    ORDER BY (e.nombre = 'Sin equipo'), e.nombre ASC;
  `);
  return NextResponse.json(rows);
}
