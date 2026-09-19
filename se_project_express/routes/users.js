const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const { validateUserProfile } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserProfile, updateUserProfile);

module.exports = router;
