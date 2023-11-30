import { PrismaClient } from "@prisma/client";

const getHosts = async (name) => {
  const prisma = new PrismaClient();

  const hosts = await prisma.host.findMany({
    where: {
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
      aboutMe: true,
    },
  });

  return hosts;
};

export default getHosts;
