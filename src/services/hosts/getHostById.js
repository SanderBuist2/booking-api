import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
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
      aboutMe: true,
    },
  });

  if (!host) {
    throw new NotFoundError("hosts", id);
  }

  return host;
};

export default getHostById;
