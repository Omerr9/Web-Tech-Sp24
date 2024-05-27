const setTokenCookie = (req, res, next) => {
    const token = req.token; // Assuming token is available in req.token
    if (token) {
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);
    }
    next();
  };
  
  module.exports = setTokenCookie;