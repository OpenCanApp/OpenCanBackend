// Check if the user has permission to access the data
// (req.user, data.userId) => {}
const checkPermission = (requestUser, resourceUserId) => {
  if (requestUser.userId === resourceUserId.toString()) return;
};
