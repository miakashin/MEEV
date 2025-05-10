import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  console.log('POST request received')
  console.log('Content-Type:', req.headers.get('content-type'))

  try {
    const formData = await req.formData()
    const formEntries = Object.fromEntries(formData)
    console.log('Received form data:', formEntries)

    // Basic validation
    if (Object.keys(formEntries).length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No form data received' 
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: 'Application received successfully',
      data: formEntries
    })
  } catch (error: unknown) {
    console.error('Unexpected error in application submission:', error)
    
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }, { status: 500 })
  }
}