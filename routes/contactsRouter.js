import express from "express";

import {
  createContact,
  deletedContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactSchema.js";
import validateBody from "../helpers/validateBody.js";

const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);

contactRouter.get("/:id", getOneContact);

contactRouter.delete("/:id", deletedContact);

contactRouter.post("/", validateBody(createContactSchema), createContact);

contactRouter.put("/:id", validateBody(createContactSchema), updateContact);

contactRouter.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  updateStatusContact
);

export default contactRouter;
