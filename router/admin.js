const express = require("express");
const router = express.Router();
const auth = require("../middleWare/auth");
const admin = require("../controller/admin");

router.post("/login/admin", admin.postLoginAdmin);

router.post("/add/user", admin.postUser);
router.get("/get/all/user/list", admin.getAllUserList);
router.patch("/update/user", admin.patchUser);
router.delete("/delete/user/:id", admin.deleteUser);

module.exports = router;
