function error(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err)
    return res.status(400).json({ status: false, error: "Bad JSON syntax" });
}

module.exports = error;
