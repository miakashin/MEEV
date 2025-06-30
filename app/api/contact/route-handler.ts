import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

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
      return new NextResponse(JSON.stringify({
        success: false,
        error: 'Invalid form type',
        details: 'The form type specified is not valid.'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
      phone: String(formData.get('phoneNumber') || ''),
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
      return new NextResponse(JSON.stringify({
        success: false,
        error: 'Server configuration error',
        details: 'Email service is not properly configured.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
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
    try {
      await transporter.verify();
    } catch (error) {
      console.error('Email server connection error:', error);
      return new NextResponse(JSON.stringify({
        success: false,
        error: 'Email service unavailable',
        details: 'Could not connect to the email service.'
      }), {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

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
      return new NextResponse(JSON.stringify({
        success: false,
        error: 'Failed to send email',
        details: 'The server encountered an error while trying to send the email.'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  } catch (error: unknown) {
    console.error('Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return new NextResponse(JSON.stringify({
      success: false,
      error: 'Internal server error',
      details: errorMessage
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it manually
  },
};
