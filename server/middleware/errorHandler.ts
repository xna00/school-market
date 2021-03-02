export default () => (err, req, res, next) => {
  console.log("----------------");
  console.log(err);
  console.log("----------------");
  res.status(err.statusCode || 500).send({
    message: err.message,
  });
};
