const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "You are not authenticated!" });
  }

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired" });
      }
      return res.status(403).json({ error: "Token is not valid" });
    }

    // Attach user information to the request
    req.userId = data.id;

    // Optionally, you can include user information in the response
    req.user = { id: data.id, username: data.username };

    next();
  });
};

module.exports = verifyToken;
