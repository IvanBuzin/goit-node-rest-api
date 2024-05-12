import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import validateId from "../helpers/validateId.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact, validateId);

contactsRouter.delete("/:id", deleteContact, validateId);

contactsRouter.post("/", createContact, validateBody(createContactSchema));

contactsRouter.put(
  "/:id",
  updateContact,
  validateId,
  validateBody(updateContactSchema)
);

contactsRouter.patch(
  "/:id/favorite",
  updateStatusContact,
  validateId,
  validateBody(updateFavoriteSchema)
);

export default contactsRouter;
