import { NextResponse } from 'next/server';
import { Pool } from '@neondatabase/serverless';
import { Resend } from 'resend';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const resend = new Resend(process.env.RESEND_API_KEY);

const SENDER_EMAIL = 'DEUT <office@deut.li>';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 1. Save to Database
    const client = await pool.connect();
    try {
      await client.query(
        'INSERT INTO superusers (email) VALUES ($1) ON CONFLICT (email) DO NOTHING',
        [email]
      );
    } finally {
      client.release();
    }

    // 2. Send Email via Resend
    try {
      await resend.emails.send({
        from: SENDER_EMAIL,
        to: email,
        subject: 'DEUT: Access Request Received',
        html: `
          <div style="font-family: Arial, Helvetica, sans-serif; color: #000000; line-height: 1.5; max-width: 500px; padding: 20px;">
            <h1 style="font-size: 20px; font-weight: bold; margin-bottom: 24px; letter-spacing: -0.02em;">DEUT</h1>
            
            <p style="margin-bottom: 16px;">Hello,</p>
            
            <p style="margin-bottom: 16px;">
              Thank you for your interest in DEUT. You have been added to the waitlist. 
              As soon as the system is ready, we will send you usage instructions and credit your account with a starter package for testing.
            </p>
            
            <p style="margin-bottom: 16px;">
              Your email address will not be shared with third parties, and we do not send spam.
              Until testing begins, we will occasionally update you on our progress.
            </p>
            
            <div style="margin-top: 40px; border-top: 1px solid #E5E5E5; padding-top: 20px; font-size: 12px; color: #666666;">
              <p style="margin-bottom: 8px;">Regards,<br>DEUT Team</p>
              <p>
                To unsubscribe, <a href="mailto:office@deut.li?subject=Unsubscribe" style="color: #666666; text-decoration: underline;">click here</a>.
              </p>
            </div>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}