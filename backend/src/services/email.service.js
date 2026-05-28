import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(to) {
  return resend.emails.send({
    from: 'onboarding@example.com',
    to,
    subject: 'Welcome',
    html: '<h1>Welcome to the app</h1>'
  });
}
