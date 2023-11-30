import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
import notFoundErrorHandler from "../../middleware/notFoundErrorHandler.js";

const updatePropertyById = async (
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  const prisma = new PrismaClient();

  if (hostId) {
    const id = hostId;
    const host = await prisma.host.findUnique({
      where: {
        id,
      },
    });
    if (!host) {
      throw new NotFoundError("host", hostId);
    }
  }
  const updatedProperty = await prisma.property.updateMany({
    where: {
      id,
    },
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    },
  });

  if (!updatedProperty || updatedProperty.count === 0) {
    throw new NotFoundError("Property", id);
  }

  return {
    message: `Property with id ${id} was updated!`,
  };
};

export default updatePropertyById;
