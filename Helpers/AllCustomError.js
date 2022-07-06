const ClearCookies = require("./ClearCookies");
const SendResponse = require("./SendResponse");

const BadReqError = async (res, message) => {
  let msg = message || "Don't understand your request.";

  await res.status(400).send(SendResponse(false, msg));
};

const BackendError = async (res, message) => {
  let msg = message || "Found an error from the backend.";

  await res.status(500).send(SendResponse(false, msg));
};

const ForbiddenError = async (res, message) => {
  let msg = message || "You do not have permission.";
  await ClearCookies(res);
  await res.status(403).send(SendResponse(false, msg));
};

const UnauthorizedError = async (res, message) => {
  let msg = message || "Unauthorized access denied.";
  await ClearCookies(res);
  await res.status(401).send(SendResponse(false, msg));
};

const NotFoundError = async (res, message) => {
  let msg = message || "Data not found.";
  await res.status(404).send(SendResponse(false, msg));
};

module.exports = {
  BadReqError,
  BackendError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError,
};
