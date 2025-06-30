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

    const formDataObj: FormDataObj = {
      name: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      educationalAttainment: formData.get('educationalAttainment') as string,
      schoolName: formData.get('schoolName') as string,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
      interview: formData.get('interview') as string,
      formType: formType,
      resume: formData.get('resume') as File | null || undefined
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
    
    if (formType === 'applicant') {
      emailContent = `
        First Name: ${formDataObj.name}\n
        Last Name: ${formDataObj.lastName}\n
        Email: ${formDataObj.email}\n
        Educational Attainment: ${formDataObj.educationalAttainment}\n
        School Name: ${formDataObj.schoolName}\n
        Phone: ${formDataObj.phone}\n
        Address: ${formDataObj.address}\n
        Interview Date: ${formDataObj.interview}\n
        Resume Attached: ${formDataObj.resume ? 'Yes' : 'No'}
      `;
    } else {
      emailContent = `
        Name: ${formDataObj.name}\n
        Email: ${formDataObj.email}\n
        Company: ${formDataObj.company}\n
        Phone: ${formDataObj.phone}\n
        ${formType === 'pricing' ? `Plan: ${formDataObj.plan}\n` : ''}
        Message:\n${formDataObj.message}
      `;
    }

    // Send email
    const mailOptions = {
      from: gmailEmail,
      to: recipientEmails.join(','),
      subject: formType === 'get-started' ? 'New Client Application' : 'Pricing Inquiry',
      text: emailContent
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Detailed error:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error.stack 
      }, { status: 500 });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'An unexpected error occurred' 
    }, { status: 500 });
  }
}
