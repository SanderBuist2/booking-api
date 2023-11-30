import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
  const prisma = new PrismaClient();

  return await prisma.property.findMany({
    where: {
      location: {
        contains: location,
      },
      pricePerNight,
    },
  });
};

export default getProperties;
