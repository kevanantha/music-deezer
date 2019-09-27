const loginMiddleware = (req, res, next) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect(`/signin?err=You need to sign in before add playlist`)
  }
}

module.exports = loginMiddleware
