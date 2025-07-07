import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query(`
    SELECT id, nombre, nivel
    FROM equipos
    ORDER BY (nombre = 'Sin equipo'), nombre ASC;
  `);

  return NextResponse.json(rows);
}
