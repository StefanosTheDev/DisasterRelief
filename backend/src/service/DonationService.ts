import AppError from '../error/AppError';
import prisma from '../prisma/prismaClient';

/** 
 *  id            String          @id @default(uuid())
  name          String
  description   String
  mediaUrl      String
  createdAt     DateTime        @default(now())

  // The user who created this campaign
  user          User            @relation(fields: [userId], references: [id])
  userId        String

  // Relation to donations for this specific campaign
  donations     Donation[]
*/
export async function _createCampaign({
  name,
  description,
  mediaUrl,
  userId,
}: {
  name: string;
  description: string;
  mediaUrl: string;
  userId: string;
}) {
  // Break down the flow
  // User submits a request in the body right.
  // Were going ot need get that USERID validate that their signed in.
  // PRIOR to that, were goingto have a ZOD schema middleware to do input validation against the body.
  // Then once have done that, we are going to get the userID from the request, and pass it into theservice as well.
  // Our controller is going to have to get that.
  // We can do further validation on the service leve if needed.
  // But create the object } return.

  // Step 1: create the new object.
  // Step 2: return .

  const newCampaign = await prisma.campaign.create({
    data: {
      name,
      description,
      mediaUrl,
      userId,
    },
  });
  return newCampaign;
}
