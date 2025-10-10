module.exports = (req, res, next) => {
  console.log(req.user);
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: 'user has not logged in' });
};
