module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  return next();
};
