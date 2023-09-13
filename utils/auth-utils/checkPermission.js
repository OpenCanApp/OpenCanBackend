const CustomError = require("../../errors");
// Check if the user has permission to access the data
// (req.user, data.userId) => {}
const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthenticatedError(
    "You are not authorized to access this route"
  );
};

module.exports = checkPermission;
