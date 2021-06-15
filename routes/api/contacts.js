const express = require("express");
const router = express.Router();
const Contacts = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts;
    res.json({ status: "success", code: "200", data: contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;