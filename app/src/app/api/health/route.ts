export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return new Response(JSON.stringify({ status: "ok", service: "matdata-mitra" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
