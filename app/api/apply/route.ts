import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Custom type for Formidable file
interface FormidableFile {
  filepath: string
  originalFilename?: string
  mimetype?: string
  size: number
}

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

export async function POST(req: Request) {
  console.log('POST request received')
  console.log('Content-Type:', req.headers.get('content-type'))

  try {
    const formData = await req.formData()
    console.log('Received form data:', Object.fromEntries(formData))
    console.log('Form data:', formData)
              }

              console.log(`File details for ${key}:`, {
                originalFilename: f.originalFilename,
                mimetype: f.mimetype,
                size: f.size,
                filepath: f.filepath,
              })
              return f
            }

            try {
              if (Array.isArray(file)) {
                processedFiles[key] = file.map(processFile)
                console.log(`Multiple files for ${key}:`, file.map(f => f.originalFilename))
              } else {
                processedFiles[key] = processFile(file)
              }
            } catch (error) {
              console.error(`Error processing file ${key}:`, error)
              // Optionally, you can choose to reject or handle the error differently
            }
          })

          resolve({ 
            fields, 
            files: processedFiles 
          })
        })
      } catch (error) {
        console.error('Unexpected error during form parsing:', error)
        reject(error)
      }
    })

    // Log form data for debugging
    const applicantData: Record<string, string> = {}
    for (const [key, value] of formData.entries()) {
      applicantData[key] = value.toString()
      console.log(`Form field ${key}:`, value)

    // Basic validation
    if (Object.keys(applicantData).length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No form data received' 
      }, { status: 400 })

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(applicantData.email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, { status: 400 })
    }

    // Removed database save for debugging

    // Removed email configuration check

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
        message: 'Failed to send notification email'
      }, { status: 500 })
    }

    // Save applicant to database before returning response
    const savedApplicant = await prisma.applicant.create({
      data: applicantData,
    })

    return new Response(JSON.stringify({
      success: true,
      message: 'Application received successfully'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (error: unknown) {
    console.error('Unexpected error in application submission:', error)
    
    // Ensure a response is always sent
    return NextResponse.json({
      success: false,
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    }, { status: 500 })
  }
}