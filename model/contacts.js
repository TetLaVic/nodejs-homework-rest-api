// const fs = require("fs/promises");
// const path = require("path");
// const { v4: uuid } = require("uuid");

const db = require("./db");
const { ObjectId } = require("mongodb");

const getCollection = async (db, name) => {
  const client = await db;
  const collection = await client.db().collection(name);
  return collection;
};

const listContacts = async () => {
  const collection = await getCollection(db, "contacts");
  const results = await collection.find({}).toArray();
  return results;
};

const getContactById = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectId(contactId);
  const [results] = await collection.find({ _id: objId }).toArray();
  return results;
};

const removeContact = async (contactId) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectId(contactId);
  const data = await readData();
  const idx = data.findIndex(({ id }) => String(id) === contactId);
  if (idx !== -1) {
    const result = data.splice(idx, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(data)
    );
    return result;
  }
  return null;
};

const addContact = async (body) => {
  const collection = await getCollection(db, "contacts");
  const record = {
    id,
    ...body,
    ...(body.favorite ? {} : { favorite: false }),
  };
  const {
    ops: [result],
  } = await collection.insertOne(record);
  return result;
};

const updateContact = async (contactId, body) => {
  const collection = await getCollection(db, "contacts");
  const objId = new ObjectId(contactId);
  const [result] = data.filter(({ id }) => String(id) === contactId);
  if (result) {
    Object.assign(result, body);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(data)
    );
  }

  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
