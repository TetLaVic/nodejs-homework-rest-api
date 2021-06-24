const Contacts = require("../repositories/contacts");

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({ status: "success", code: "200", data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({ status: "success", code: "200", data: { contact } });
    }
    return res.json({ status: "error", code: "404", message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    console.log("contact", contact);
    if (
      contact?.name &&
      contact?.email &&
      contact?.phone &&
      contact?.favorite !== null
    ) {
      return res
        .status(201)
        .json({ status: "success", code: "201", data: { contact } });
    }
    return res.json({
      status: "error",
      code: "404",
      message: "Missing required name field",
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: "200",
        message: "Contact deleted",
      });
    }
    return res.json({ status: "error", code: "404", message: "Not found" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.json({
        status: "error",
        code: "400",
        message: "Missing fields",
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (
      contact?.name &&
      contact?.email &&
      contact?.phone &&
      contact?.favorite !== null
    ) {
      return res.json({ status: "success", code: "200", data: { contact } });
    }
    return res.json({
      status: "error",
      code: "404",
      message: "Not found",
    });
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.json({
        status: "error",
        code: "400",
        message: "Missing field 'favorite'",
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    return res.json({ status: "success", code: "200", data: { contact } });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, remove, update, updateFavorite };
