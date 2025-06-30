// Use Edge Runtime for better performance on Vercel
export const runtime = 'edge';

// Re-export the POST handler from route-handler.ts
export { POST } from './route-handler';

// This is a workaround for TypeScript to recognize the route
export const dynamic = 'force-dynamic';

// Export an empty GET handler to prevent 405 errors
export async function GET() {
  return new Response(
    JSON.stringify({ 
      error: 'Method not allowed',
      message: 'Use POST method to submit the form' 
    }),
    {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
        'Allow': 'POST'
      }
    }
  );
}
