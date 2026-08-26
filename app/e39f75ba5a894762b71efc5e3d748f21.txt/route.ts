export const dynamic = 'force-static';

export async function GET() {
  return new Response('e39f75ba5a894762b71efc5e3d748f21', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
