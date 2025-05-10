import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: Request) {
  console.log('🚀 POST request received to /api/apply')
  console.log('Full Request Headers:', Object.fromEntries(req.headers))
  const contentType = req.headers.get('content-type') || ''
  console.log('Content-Type:', contentType)
  console.log('Request Method:', req.method)
  console.log('Request URL:', req.url)

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
    console.log('Formspree Form ID:', process.env.FORMSPREE_FORM_ID)
    
    try {
      // Validate Form ID
      if (!process.env.FORMSPREE_FORM_ID) {
        console.error('Formspree Form ID is not set')
        return NextResponse.json({
          success: false,
          message: 'Formspree Form ID is missing',
          error: 'No Formspree Form ID configured'
        }, { status: 500 })
      }

      // Prepare submission data
      const submissionData = {
        ...formEntries,
        _replyto: formEntries.email || 'No email provided'
      }

      console.log('Submission Data:', JSON.stringify(submissionData))

      const formspreeResponse = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionData)
      })

      // Log full response for debugging
      const responseText = await formspreeResponse.text()
      console.log('Formspree Response Status:', formspreeResponse.status)
      console.log('Formspree Response Body:', responseText)

      if (!formspreeResponse.ok) {
        console.error('Formspree submission failed:', responseText)
        return NextResponse.json({
          success: false,
          message: 'Form submission to Formspree failed',
          error: responseText
        }, { status: formspreeResponse.status })
      }

      console.log('Form submitted to Formspree successfully')
      return NextResponse.json({
        success: true,
        message: 'Application received successfully',
        data: formEntries
      })
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