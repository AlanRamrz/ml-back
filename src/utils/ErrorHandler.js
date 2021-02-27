// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err && err.isBaseError && err.isBaseError === true) {
    return res.status(err.status).send({ code: err.code, message: err.message });
  }

  if (err.error && err.error.isJoi && err.error.isJoi === true) {
    const message = err.error.details.map((it) => it.message).join(', ');

    return res.status(400).send({ code: 'ValidationError', message });
  }

  return res.status(500).send({ message: err });
};
