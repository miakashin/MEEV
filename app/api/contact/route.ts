// Use Node.js Runtime for Nodemailer compatibility
export const runtime = 'nodejs';

// Re-export the POST handler from route-handler.ts
export { POST } from './route-handler';

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
