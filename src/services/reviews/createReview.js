import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  let id = userId;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new NotFoundError("users", id);
  }

  id = propertyId;
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    throw new NotFoundError("properties", id);
  }

  return prisma.review.create({
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });
};

export default createReview;
