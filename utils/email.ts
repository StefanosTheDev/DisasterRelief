import sgMail from '@sendgrid/mail';

import dotenv from 'dotenv';

dotenv.config();

// Define the email message
const msg: sgMail.MailDataRequired = {
  to: 'stefanos@clearstack.ai', // Replace with recipient's email
  from: 'no-reply@em9716.clearstack.ai', // Replace with your verified SendGrid sender email
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>Stefanos Sophocleous Most Updated Email</strong>',
};

// Send the email
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent');
  })
  .catch((error) => {
    console.error(
      'Error sending email:',
      error.response ? error.response.body : error.message
    );
  });
