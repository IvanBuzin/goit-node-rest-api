import Contact from "../models/contact.js";
import {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404).send({ message: "Not found" });
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      res.status(404).send({ message: "Not found" });
    }
    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const { error } = createContactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).send({ message: "Fields must be filled" });
    }
    const contact = await Contact.create({ name, email, phone });
    res.status(201).send(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  try {
    const { error } = updateContactSchema.validate({ name, email, phone });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  try {
    const { error } = updateFavoriteSchema.validate({
      favorite,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({ message: "Not found" });
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
