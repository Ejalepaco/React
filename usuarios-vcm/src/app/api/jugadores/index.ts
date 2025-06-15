import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query(`
SELECT j.*, e.nombre AS nombre_equipo, n.nombre AS nivel
FROM jugadores j
LEFT JOIN equipos e ON j.equipo_id = e.id
LEFT JOIN niveles n ON e.nivel_id = n.id

    ORDER BY j.nombre ASC
  `);
  return NextResponse.json(rows);
}
