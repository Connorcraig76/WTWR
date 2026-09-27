const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UNAUTHORIZED } = require("../utils/errors");

const handleUnauthorized = (next) => {
  const error = new Error("Authorization required");
  error.statusCode = UNAUTHORIZED;

  return next(error);
};

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return handleUnauthorized(next);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleUnauthorized(next);
  }

  req.user = payload;
  return next();
};

module.exports = auth;
