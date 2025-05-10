import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NOTIFY_EMAIL,
        pass: process.env.NOTIFY_EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: process.env.NOTIFY_EMAIL,
      to: 'Monalisa.Degale@meevassist.com, Lorenzo.mejia@meevassist.com, Emmanuel.deocades@meevassist.com, mejiaalvinjohn@gmail.com',
      subject: 'New Applicant Submission',
      text: Object.entries(formEntries)
        .map(([key, value]) => `${key}: ${value}`)
        .join('
')
    }

    try {
      await transporter.sendMail(mailOptions)
      console.log('Email sent successfully')
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
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