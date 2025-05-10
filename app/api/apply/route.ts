import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import formidable from 'formidable'
import { readFile } from 'fs/promises'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const prisma = new PrismaClient()

export async function POST(req: any) {
  const form = formidable({ multiples: false })
  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  }) as any

  const {
    firstName, lastName, email, educationalAttainment,
    schoolName, phoneNumber, address, interview
  } = data.fields

  // Save to database
  await prisma.applicant.create({
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

  // Prepare email with attachment
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NOTIFY_EMAIL,
      pass: process.env.NOTIFY_EMAIL_PASS,
    },
  })

  const attachments = []
  if (data.files.resume) {
    const file = data.files.resume
    const fileContent = await readFile(file.filepath)
    attachments.push({
      filename: file.originalFilename,
      content: fileContent,
    })
  }

  const mailOptions = {
    from: process.env.NOTIFY_EMAIL,
    to: process.env.NOTIFY_EMAIL_TO,
    subject: 'New Applicant Submission',
    text: `A new applicant has applied:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nEducational Attainment: ${educationalAttainment}\nSchool Name: ${schoolName}\nPhone Number: ${phoneNumber}\nAddress: ${address}\nInterview: ${interview ? new Date(interview).toLocaleString() : 'N/A'}`,
    attachments,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send notification email:', error)
  }

  return NextResponse.json({ success: true })
}