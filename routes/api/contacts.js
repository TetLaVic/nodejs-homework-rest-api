const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts");

const {
  createContactValidation,
  updateContactValidation,
  updateContactFavoriteValidation,
} = require("./validation");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", createContactValidation, ctrl.create);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", updateContactValidation, ctrl.update);

router.patch(
  "/:contactId/favorite",
  updateContactFavoriteValidation,
  ctrl.updateFavorite
);

module.exports = router;
