import { sendEmail } from './sendEmailGrid';

(async () => {
  try {
    await sendEmail({
      to: 'stefanos26@sophocleous@gmail.com', // Replace with recipient's email
      from: 'stefanos@clearstack.ai.', // Replace with your verified SendGrid sender email
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    });

    console.log('Test email sent successfully!');
  } catch (error) {
    console.error('Failed to send test email:', error);
  }
})();
