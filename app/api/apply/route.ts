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
          message: 'Form submission failed',
          error: errorData
        }, { status: formspreeResponse.status })
      }

      console.log('Form submitted to Formspree successfully')
    } catch (formspreeError) {
      console.error('Formspree submission error:', formspreeError)
      return NextResponse.json({
        success: false,
        message: 'Form submission failed',
        error: formspreeError
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
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }, { status: 500 })
  }
}