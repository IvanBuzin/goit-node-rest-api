import contactsService from "../services/contactsServices.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import crypto from "node:crypto";
import { error } from "node:console";

export const getAllContacts = async (req, res, next) => {
  const contactsList = await contactsServices.listContacts();
  try {
    res.status(200).send(contactsList);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  try {
    if (contact) {
      res.status(200).send(contact);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);
  try {
    if (contact) {
      res.status(200).send(contact);
    } else {
      res.status(404).send({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error, value } = createContactSchema.validate({ name, email, phone });
  console.log(error);
  if (typeof error !== "undefined") {
    return res.status(400).send({ message: "Fields must be filled" });
  }
  try {
    const contact = await contactsServices.addContact(name, email, phone);
    res.status(201).send({ id: crypto.ramdomUUID(), ...value });
  } catch (error) {
    next(error);
  }
};

export const updateContact = (req, res) => {};
