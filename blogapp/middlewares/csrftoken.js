module.exports =  (req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // CSRF token'ını şablona ekler
  next();
}


