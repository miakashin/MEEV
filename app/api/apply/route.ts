import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  console.log('POST request received')
  const contentType = req.headers.get('content-type') || ''
  console.log('Content-Type:', contentType)

  try {
    let formEntries: Record<string, any>

    // Handle different content types
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      formEntries = Object.fromEntries(formData)
    } else if (contentType.includes('application/json')) {
      formEntries = await req.json()
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Unsupported content type' 
      }, { status: 415 })
    }

    console.log('Received form data:', formEntries)

    // Basic validation
    if (Object.keys(formEntries).length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No form data received' 
      }, { status: 400 })
    }

    // Forward form data to Formspree
    try {
      const formspreeResponse = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formEntries)
      })

      if (!formspreeResponse.ok) {
        const errorData = await formspreeResponse.text()
        console.error('Formspree submission failed:', errorData)
        return NextResponse.json({
          success: false,
          message: 'Form submission to Formspree failed',
          error: errorData
        }, { status: formspreeResponse.status })
      }

      console.log('Form submitted to Formspree successfully')
    } catch (formspreeError) {
      console.error('Formspree submission error:', formspreeError)
      return NextResponse.json({
        success: false,
        message: 'Unexpected error in form submission',
        error: String(formspreeError)
      }, { status: 500 })
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
      message: 'Internal server error',
      error: String(error)
    }, { status: 500 })
  }
}