import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateBookingById = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
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
  const updatedProperty = await prisma.booking.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  if (!updatedProperty || updatedProperty.count === 0) {
    throw new NotFoundError("Bookings", id);
  }

  return {
    message: `Booking with id ${id} was updated!`,
  };
};

export default updateBookingById;
