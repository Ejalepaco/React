import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const equipoId = Number(params.id);

  const [rows] = await db.query(
    `
    SELECT * FROM jugadores_por_equipo WHERE equipo_id = ?
  `,
    [equipoId]
  );

  return NextResponse.json(rows);
}
