import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';
import { sendEmail } from '../utils/email';
/**
 * Handle forgot username request
 * @param email users registred email.
 */
export async function forgotUsername(email: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new AppError('No Account found with that email', 404);
  }

  // Send email with the username
  const message = `Hello,\n\nYour username associated with this email is: ${user.name}.\n\nThank you.`;
  await sendEmail(email, 'Your Username', message);
}
