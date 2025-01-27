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
