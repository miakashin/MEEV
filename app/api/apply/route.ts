import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import Formidable, { File as FormidableFile } from 'formidable'
import { readFile } from 'fs/promises'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// Custom type guard for Formidable files
function isFormidableFile(file: any): file is FormidableFile {
  return file && typeof file === 'object' && 'filepath' in file
}

interface ApplicantData {
  firstName: string
  lastName: string
  email: string
  educationalAttainment: string
  schoolName: string
  phoneNumber?: string
  address?: string
  interview?: Date
}

export async function POST(req: NextRequest) {
  // Validate request method
  if (req.method !== 'POST') {
    console.error('Invalid request method:', req.method)
    return NextResponse.json({
      success: false,
      message: 'Invalid request method'
    }, { status: 405 })
  }

  try {
    // Log raw request details
    console.log('Starting application submission')
    console.log('Request method:', req.method)
    console.log('Request headers:', Object.fromEntries(req.headers))

    // Validate content type
    const contentType = req.headers.get('content-type')
    if (!contentType?.includes('multipart/form-data')) {
      console.error('Invalid content type:', contentType)
      return NextResponse.json({
        success: false,
        message: 'Invalid content type. Expected multipart/form-data'
      }, { status: 400 })
    }

    // Configure Formidable with safe options
    const form = new Formidable({
      multiples: false,
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB max file size
      maxFields: 20,
    })

    // Detailed promise for form parsing
    const parsedData = await new Promise<{ fields: { [key: string]: string | string[] }; files: { [key: string]: any } }>((resolve, reject) => {
      form.parse(req as any, (err: Error | null, fields, files) => {
        if (err) {
          console.error('Form parsing error:', {
            errorName: err.name,
            errorMessage: err.message,
            errorStack: err.stack,
          })
          reject(err)
        } else {
          console.log('Form parsed successfully')
          console.log('Parsed fields:', JSON.stringify(fields, null, 2))
          console.log('Parsed files:', Object.keys(files))
          
          // Safely log file details
          Object.entries(files).forEach(([key, file]) => {
            if (isFormidableFile(file)) {
              console.log(`File details for ${key}:`, {
                originalFilename: file.originalFilename,
                mimetype: file.mimetype,
                size: file.size,
                filepath: file.filepath,
              })
            } else if (Array.isArray(file)) {
              console.log(`Multiple files for ${key}:`, file.map(f => f.originalFilename))
            }
          })

          resolve({ fields, files })
        }
      })
    })

    const extractField = (field: string | string[] | undefined): string => {
      return Array.isArray(field) ? field[0] : field || ''
    }

    const applicantData: ApplicantData = {
      firstName: extractField(parsedData.fields.firstName),
      lastName: extractField(parsedData.fields.lastName),
      email: extractField(parsedData.fields.email),
      educationalAttainment: extractField(parsedData.fields.educationalAttainment),
      schoolName: extractField(parsedData.fields.schoolName),
      phoneNumber: extractField(parsedData.fields.phoneNumber),
      address: extractField(parsedData.fields.address),
      interview: parsedData.fields.interview ? new Date(extractField(parsedData.fields.interview)) : undefined
    }

    // Validate required fields
    const requiredFields: (keyof ApplicantData)[] = ['firstName', 'lastName', 'email', 'educationalAttainment', 'schoolName']
    const missingFields = requiredFields.filter(field => !applicantData[field])

    if (missingFields.length > 0) {
      return NextResponse.json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}` 
      }, { status: 400 })
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(applicantData.email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, { status: 400 })
    }

    // Save to database
    await prisma.applicant.create({
      data: applicantData,
    })

    // Validate email configuration
    const notifyEmail = process.env.NOTIFY_EMAIL
    const notifyEmailPass = process.env.NOTIFY_EMAIL_PASS

    if (!notifyEmail || !notifyEmailPass) {
      console.error('Missing email configuration', {
        emailProvided: !!notifyEmail,
        passwordProvided: !!notifyEmailPass
      })
      throw new Error('Email configuration is incomplete')
    }

    // Prepare email with attachment
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: notifyEmail,
        pass: notifyEmailPass,
      },
    })

    const attachments = []
    const resumeFile = Array.isArray(parsedData.files.resume) ? parsedData.files.resume[0] : parsedData.files.resume
    if (resumeFile) {
      const fileContent = await readFile(resumeFile.filepath)
      attachments.push({
        filename: resumeFile.originalFilename || 'resume',
        content: fileContent,
      })
    }

    const mailOptions = {
      from: process.env.NOTIFY_EMAIL || '',
      to: 'Monalisa.Degale@meevassist.com, Lorenzo.mejia@meevassist.com, Emmanuel.deocades@meevassist.com, mejiaalvinjohn@gmail.com',
      subject: 'New Applicant Submission',
      text: `A new applicant has applied:

Name: ${applicantData.firstName} ${applicantData.lastName}
Email: ${applicantData.email}
Educational Attainment: ${applicantData.educationalAttainment}
School Name: ${applicantData.schoolName}
Phone Number: ${applicantData.phoneNumber || 'N/A'}
Address: ${applicantData.address || 'N/A'}
Interview: ${applicantData.interview ? applicantData.interview.toLocaleString() : 'N/A'}`,
      attachments,
    }

    // Send email
    try {
      const sendResult = await transporter.sendMail(mailOptions)
      console.log('Email sent successfully:', sendResult)
    } catch (error: unknown) {
      const emailError = error instanceof Error ? error : new Error(String(error))
      
      console.error('Failed to send notification email:', emailError)
      // Log the full error details
      console.error('Email error details:', {
        message: emailError.message,
        stack: emailError.stack,
      })

      // Return an error response if email sending fails
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to send notification email',
        error: emailError.message
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Application submitted successfully' 
    })
  } catch (error: unknown) {
    const serverError = error instanceof Error ? error : new Error(String(error))
    console.error('Server error:', serverError)
    console.error('Error name:', serverError.name)
    console.error('Error message:', serverError.message)
    console.error('Error stack:', serverError.stack)
    
    // Log additional context if available
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        cause: (error as any).cause,
      })
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error',
      error: serverError.message
    }, { status: 500 })
  }
}