import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
  console.log('🚀 POST request received to /api/apply')
  const contentType = req.headers.get('content-type') || ''

  try {
    let formEntries: Record<string, any>

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

    if (Object.keys(formEntries).length === 0) {
      return NextResponse.json({
        success: false,
        message: 'No form data received'
      }, { status: 400 })
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Prepare email content
    let emailHtml = '<h1>New Application Received</h1>';
    const attachments = [];
    for (const [key, value] of Object.entries(formEntries)) {
      if (value instanceof File) {
        emailHtml += `<p><strong>${key}:</strong> ${value.name} (${value.type}, ${value.size} bytes) - Attached</p>`;
        console.log(`Processing file: ${value.name}, type: ${value.type}, size: ${value.size}`);
        try {
          const buffer = await value.arrayBuffer();
          console.log(`Successfully read file ${value.name} into arrayBuffer, length: ${buffer.byteLength}`);
          if (buffer.byteLength === 0) {
            console.warn(`WARNING: File ${value.name} resulted in an empty buffer.`);
          }
          attachments.push({
            filename: value.name,
            content: Buffer.from(buffer),
            contentType: value.type,
          });
        } catch (fileReadError) {
          console.error(`Error reading file ${value.name} into arrayBuffer:`, fileReadError);
          emailHtml += `<p><strong>ERROR PROCESSING ${key}:</strong> Could not read file content.</p>`;
        }
      } else {
        emailHtml += `<p><strong>${key}:</strong> ${value}</p>`;
      }
    }

    const mailOptions = {
      from: `"VA Website Application" <${process.env.GMAIL_EMAIL}>`,
      to: process.env.GMAIL_RECIPIENT_EMAILS, // Send to your list of emails
      subject: 'New Application Submission',
      html: emailHtml,
      attachments: attachments, // Add attachments here
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return NextResponse.json({
        success: true,
        message: 'Application received successfully and email sent',
        data: formEntries
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json({
        success: false,
        message: 'Application received, but failed to send email notification.',
        error: String(emailError)
      }, { status: 500 });
    }

  } catch (error: unknown) {
    console.error('Unexpected error in application submission:', error)
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
      error: String(error)
    }, { status: 500 })
  }
}