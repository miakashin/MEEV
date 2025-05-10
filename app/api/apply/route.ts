import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const {
    firstName,
    lastName,
    email,
    educationalAttainment,
    schoolName,
    phoneNumber,
    address,
    interview,
  } = await req.json()

  // Save to database
  const applicant = await prisma.applicant.create({
    data: {
      firstName,
      lastName,
      educationalAttainment,
      schoolName,
      phoneNumber,
      address,
      interview: interview ? new Date(interview) : undefined,
    },
  })

  // Send notification email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NOTIFY_EMAIL,
      pass: process.env.NOTIFY_EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.NOTIFY_EMAIL,
    to: process.env.NOTIFY_EMAIL_TO,
    subject: 'New Applicant Submission',
    text: `
A new applicant has applied:

Name: ${firstName} ${lastName}
Email: ${email}
Educational Attainment: ${educationalAttainment}
School Name: ${schoolName}
Phone Number: ${phoneNumber}
Address: ${address}
Interview: ${interview ? new Date(interview).toLocaleString() : 'N/A'}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send notification email:', error)
  }

  return NextResponse.json(applicant)
}

export async function GET() {
  const applicants = await prisma.applicant.findMany({
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json(applicants)
}