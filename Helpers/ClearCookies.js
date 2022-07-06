const ClearCookies = async (res) => {
  await res.clearCookie("Auth_token", "/");
  return true;
};

module.exports = ClearCookies;