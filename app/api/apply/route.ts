import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import nodemailer from 'nodemailer'
import Formidable from 'formidable'
import { readFile } from 'fs/promises'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const form = new Formidable({ multiples: false })
  const data = await new Promise<{ fields: { [key: string]: string | string[] }; files: { [key: string]: any } }>((resolve, reject) => {
    form.parse(req as any, (err: Error | null, fields, files) => {
      if (err) reject(err)
      else resolve({ fields, files })
    })
  })

  const {
    firstName: firstNameArr, 
    lastName: lastNameArr, 
    email: emailArr, 
    educationalAttainment: educationalAttainmentArr,
    schoolName: schoolNameArr, 
    phoneNumber: phoneNumberArr, 
    address: addressArr, 
    interview: interviewArr
  } = data.fields

  const firstName = Array.isArray(firstNameArr) ? firstNameArr[0] : firstNameArr
  const lastName = Array.isArray(lastNameArr) ? lastNameArr[0] : lastNameArr
  const email = Array.isArray(emailArr) ? emailArr[0] : emailArr
  const educationalAttainment = Array.isArray(educationalAttainmentArr) ? educationalAttainmentArr[0] : educationalAttainmentArr
  const schoolName = Array.isArray(schoolNameArr) ? schoolNameArr[0] : schoolNameArr
  const phoneNumber = Array.isArray(phoneNumberArr) ? phoneNumberArr[0] : phoneNumberArr
  const address = Array.isArray(addressArr) ? addressArr[0] : addressArr
  const interview = Array.isArray(interviewArr) ? interviewArr[0] : interviewArr

  // Save to database
  await prisma.applicant.create({
    data: {
      firstName: firstName || '',
      lastName: lastName || '',
      educationalAttainment: educationalAttainment || '',
      schoolName: schoolName || '',
      phoneNumber: phoneNumber || '',
      address: address || '',
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
    const file = Array.isArray(data.files.resume) ? data.files.resume[0] : data.files.resume
    const fileContent = await readFile(file.filepath)
    attachments.push({
      filename: file.originalFilename || 'resume',
      content: fileContent,
    })
  }

  const mailOptions = {
    from: process.env.NOTIFY_EMAIL || '',
    to: process.env.NOTIFY_EMAIL_TO || '',
    subject: 'New Applicant Submission',
    text: `A new applicant has applied:

Name: ${firstName || 'N/A'} ${lastName || 'N/A'}
Email: ${email || 'N/A'}
Educational Attainment: ${educationalAttainment || 'N/A'}
School Name: ${schoolName || 'N/A'}
Phone Number: ${phoneNumber || 'N/A'}
Address: ${address || 'N/A'}
Interview: ${interview ? new Date(interview).toLocaleString() : 'N/A'}`,
    attachments,
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('Failed to send notification email:', error)
  }

  return NextResponse.json({ success: true })
}