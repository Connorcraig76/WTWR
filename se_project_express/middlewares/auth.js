const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const handleUnauthorized = (res) => {
  res.status(UNAUTHORIZED).send({ message: "Authorization required" });
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleUnauthorized(res);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleUnauthorized(res);
  }

  req.user = payload;
  return next();
};

module.exports = auth;
