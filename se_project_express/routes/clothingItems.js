const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const {
  validateCardBody,
  validateCardId,
} = require("../middlewares/validation");

router.get("/", getItems);

router.post("/", auth, validateCardBody, createItem);
router.delete("/:itemId", auth, validateCardId, deleteItem);
router.put("/:itemId/likes", auth, validateCardId, likeItem);
router.delete("/:itemId/likes", auth, validateCardId, dislikeItem);

module.exports = router;
