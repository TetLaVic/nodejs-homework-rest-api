const Contact = require("../model/contact");

const listContacts = async (userId, query) => {
  // const results = await Contact.find({ owner: userId }).populate({
  //   path: "owner",
  //   select: "email subscription",
  // });
  const {
    sortBy,
    sortByDesc,
    filter,
    favorite = false,
    limit = 5,
    offset,
  } = query;
  const optionsSearch = { owner: userId };
  if (favorite) {
    optionSearch.favorite = favorite;
  }
  const results = Contact.paginate(optionsSearch, { limit, offset });
  return results;
};

const getContactById = async (userId, contactId) => {
  return await Contact.findOne({ _id: contactId, owner: userId }).populate({
    path: "owner",
    select: "email subscription",
  });
};

const removeContact = async (userId, contactId) => {
  return await Contact.findOneAndRemove({ _id: contactId, owner: userId });
};

const addContact = async (userId, body) => {
  return await Contact.create({ ...body, owner: userId });
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    { ...body },
    { new: true }
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
