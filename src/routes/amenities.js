import { Router } from "express";
import authMiddleware from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenity from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";

const router = Router();

router.get("/", async (req, res) => {
  const amenities = await getAmenities();
  res.status(200).json(amenities);
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const amenity = await getAmenityById(id);

      res.status(200).json(amenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", authMiddleware, async (req, res) => {
  const { name } = req.body;
  const newAmenity = await createAmenity(name);
  res.status(201).json(newAmenity);
});

router.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedAmenity = await updateAmenityById(id, name);
      res.status(200).json(updatedAmenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletedAmenityId = await deleteAmenity(id);

      res.status(200).json({
        message: `Host with id ${deletedAmenityId} was deleted!`,
      });
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

export default router;
