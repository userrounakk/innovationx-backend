const { Router } = require("express");
const router = Router();
const {
  register,
  verify,
  login,
  deliverables,
  newDeliverable,
} = require("../app/controller/auth-controller");
const hashPassword = require("../app/middleware/hash");
const uniqueEmail = require("../app/middleware/unique-email");

router.post("/register", hashPassword, uniqueEmail, register);
router.post("/verify", verify);
router.get("/login", login);
router.get("/deliverables", deliverables);
router.post("/newDeliverable", newDeliverable);
module.exports = router;
