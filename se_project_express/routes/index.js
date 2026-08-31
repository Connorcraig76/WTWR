const router = require("express").Router();
const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/items", clothingItemRouter);

router.use("/users", auth, userRouter);

module.exports = router;
