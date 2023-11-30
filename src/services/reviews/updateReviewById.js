import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateReviewById = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  if (userId) {
    const id = userId;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundError("users", userId);
    }
  }

  if (propertyId) {
    const id = propertyId;
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
    });
    if (!property) {
      throw new NotFoundError("properties", propertyId);
    }
  }
  const updatedProperty = await prisma.review.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  if (!updatedProperty || updatedProperty.count === 0) {
    throw new NotFoundError("Reviews", id);
  }

  return {
    message: `Review with id ${id} was updated!`,
  };
};

export default updateReviewById;
