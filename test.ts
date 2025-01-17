import { sendEmail } from './utils/email';

(async () => {
  try {
    const recipient = 'recipient_email@example.com'; // Replace with your test recipient
    const subject = 'Test Email';
    const body = 'This is a test email sent using Gmail and Nodemailer.';

    await sendEmail(recipient, subject, body);

    console.log('Test email sent successfully!');
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
})();
