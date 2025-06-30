import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Set the runtime to Node.js
export const runtime = 'nodejs';

// Function to get plan price based on plan name
function getPlanPrice(plan: string): string {
  const planPrices: { [key: string]: string } = {
    'starter': '$1,200/month',
    'professional': '$1,500-$2,000/month',
    'enterprise': 'Custom'
  };
  return planPrices[plan.toLowerCase()] || 'Unknown plan';
}

// Function to get recipient emails based on form type
function getRecipientEmails(formType: string): string[] {
  // For the get-started form, always send to virtual.services@meevassist.com
  if (formType === 'get-started') {
    return ['virtual.services@meevassist.com'];
  }
  // For other forms, use the environment variable
  const recipientEmails = process.env.GMAIL_RECIPIENT_EMAILS || 'mejiaalvinjohn@gmail.com';
  return recipientEmails.split(',').map(email => email.trim());
}

export async function POST(request: Request) {
  try {
    // Parse form data
    const formData = await request.formData();
    const formType = formData.get('formType') as string;
    
    if (formType !== 'get-started' && formType !== 'pricing' && formType !== 'applicant') {
      throw new Error('Invalid form type');
    }

    // Get form data
    interface FormDataObj {
      name: string;
      lastName: string;
      email: string;
      educationalAttainment: string;
      schoolName: string;
      phone: string;
      address: string;
      interview: string;
      formType: string;
      plan?: string;
      message?: string;
      company?: string;
      resume?: File | null;
    }

    // Get all form data with proper type casting
    const formDataObj: FormDataObj = {
      name: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      email: String(formData.get('email') || ''),
      educationalAttainment: String(formData.get('educationalAttainment') || ''),
      schoolName: String(formData.get('schoolName') || ''),
      phone: String(formData.get('phoneNumber') || ''), // Fixed field name to match form
      address: String(formData.get('address') || ''),
      interview: String(formData.get('interview') || ''),
      formType: formType,
      resume: formData.get('resume') as unknown as File || undefined
    };

    // Add plan information if it's a pricing form
    if (formType === 'pricing') {
      formDataObj.plan = formData.get('plan') as string;
    }

    // Get recipient emails based on form type
    const recipientEmails = getRecipientEmails(formType);

    // Get environment variables
    const gmailEmail = process.env.GMAIL_EMAIL;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailEmail || !gmailPassword) {
      throw new Error('Email configuration missing');
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailEmail,
        pass: gmailPassword,
      },
    });

    // Verify transporter connection
    await transporter.verify();

    // Email content
    let emailContent = '';
    let subject = '';
    
    if (formType === 'applicant') {
      subject = 'New Job Application';
      emailContent = `
        First Name: ${formDataObj.name}
        Last Name: ${formDataObj.lastName}
        Email: ${formDataObj.email}
        Educational Attainment: ${formDataObj.educationalAttainment}
        School Name: ${formDataObj.schoolName}
        Phone: ${formDataObj.phone}
        Address: ${formDataObj.address}
        Interview Date: ${formDataObj.interview ? new Date(formDataObj.interview).toLocaleString() : 'Not specified'}
        Resume Attached: ${formDataObj.resume ? 'Yes' : 'No'}
      `;
    } else if (formType === 'pricing') {
      subject = 'Pricing Inquiry';
      emailContent = `
        Name: ${formDataObj.name} ${formDataObj.lastName}
        Email: ${formDataObj.email}
        Phone: ${formDataObj.phone}
        Plan: ${formDataObj.plan || 'Not specified'}
      `;
    } else { // get-started
      subject = 'New Client Application';
      emailContent = `
        Name: ${formDataObj.name} ${formDataObj.lastName}
        Email: ${formDataObj.email}
        Phone: ${formDataObj.phone}
        Message: ${formDataObj.message || 'No message provided'}
      `;
    }

    // Send email
    try {
      const mailOptions: any = {
        from: gmailEmail,
        to: recipientEmails.join(','),
        subject: subject,
        text: emailContent.trim(),
      };

      // Handle file attachment if present
      if (formDataObj.resume) {
        const resumeFile = formDataObj.resume as unknown as File;
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        mailOptions.attachments = [{
          filename: resumeFile.name || 'resume.pdf',
          content: buffer
        }];
      }

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return new NextResponse(JSON.stringify({ 
        success: true,
        message: 'Form submitted successfully' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      throw new Error('Failed to send email');
    }
  } catch (error: unknown) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      return new NextResponse(JSON.stringify({ 
        success: false, 
        error: error.message,
        details: error.stack 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    return new NextResponse(JSON.stringify({ 
      success: false, 
      error: 'An unexpected error occurred' 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
