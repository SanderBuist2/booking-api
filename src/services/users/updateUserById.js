import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateUserById = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const updatedBook = await prisma.user.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });

  if (!updatedBook || updatedBook.count === 0) {
    throw new NotFoundError("User", id);
  }

  return {
    message: `User with id ${id} was updated!`,
  };
};

export default updateUserById;
