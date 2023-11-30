import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email, name) => {
  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    where: {
      username: {
        contains: username,
      },
      email,
      name: {
        contains: name,
      },
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

  return users;
};

export default getUsers;
