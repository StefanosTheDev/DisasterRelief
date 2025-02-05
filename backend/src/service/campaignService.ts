import AppError from '../error/appError';
import prisma from '../prisma/prismaClient';

export async function createCampaignRecord({
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

export async function getAllCampaignRecords() {
  const allCampaigns = await prisma.campaign.findMany();
  return allCampaigns;
}

// export async function deleteCampaignRecordByID({ userId }: { userId: string }) {
//   // Make sure that campaign still exists with the user
//   const campaign = await prisma.campaign.findUnique({ where: { id: userId } });
//   if (!campaign) {
//     throw new AppError('No Campaign Found', 400);
//   }
//   // Make sure the campaign array, where its stored in the obj. It's user ID is the same as the userID of the logged in user
//   if (campaign.userId !== userId) {
//     throw new AppError('You do not own this campaign', 400);
//   }

//   // Delete The Campaign

//   return delCampaign;
// }
