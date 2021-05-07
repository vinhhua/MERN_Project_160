exports.getPrivateRoute = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      data: `Welcome, you have successfully signed in`,
    });
};