const express = require("express");
const { getAllContacts, getMyContact, createMyContact, updateMyContact, deletMyContact } = require("../controller/contactController");
const router = express.Router();

router.route("/allContact").get(getAllContacts);
router.route("/createContact").post(createMyContact);
router.route("/getContact/:id").get(getMyContact);
router.route("/updateContact/:id").put(updateMyContact);
router.route("/deleteContact/:id").delete(deletMyContact);

module.exports = router;
