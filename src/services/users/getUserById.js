import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });

  if (!user) {
    throw new NotFoundError("users", id);
  }

  return user;
};

export default getUserById;
