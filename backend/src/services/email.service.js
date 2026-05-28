import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to) {
  return resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to,
    subject: 'Welcome',
    html: '<h1>Welcome to the app</h1>'
  });
}

