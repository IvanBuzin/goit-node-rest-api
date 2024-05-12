import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export async function getAllContacts(req, res, next) {
  const page = req.query.page || 1;
  const per_page = req.query.per_page || 12;
  const skip = (page - 1) * per_page;
  const favorite = req.query.favorite;

  try {
    const ownerId = { owner: req.user.id };

    let query = Contact.find(ownerId);

    if (favorite === "true") {
      query = query.where("favorite").equals(true);
    }

    const allContacts = await query.skip(skip).limit(per_page).exec();

    console.log(allContacts);
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
}

export async function getOneContact(req, res, next) {
  try {
    const { id } = req.params;
    const oneContact = await Contact.findById(id);
    if (!oneContact) {
      throw HttpError(404);
    }
    if (oneContact.owner.toString() !== req.user.id) {
      throw HttpError(404);
    }

    res.status(200).json(oneContact);
  } catch (error) {
    next(error);
  }
}

export async function deletedContact(req, res, next) {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      throw HttpError(404);
    }

    if (deletedContact.owner.toString() !== req.user.id) {
      throw HttpError(404);
    }

    res.status(200).json(deletedContact);
  } catch (error) {
    next(error);
  }
}

export async function createContact(req, res, next) {
  console.log(req.user);
  try {
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      owner: req.user.id,
    };
    const newContact = await Contact.create(contact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req, res, next) {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404);
    }
    if (result.owner.toString() !== req.user.id) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateStatusContact(req, res, next) {
  try {
    const { id } = req.params;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404);
    }
    if (result.owner.toString() !== req.user.id) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
