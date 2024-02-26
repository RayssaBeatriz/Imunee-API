const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  console.log(token); 

  if (!token) {
    return res.status(401).json({ error: 'Authentication failed. Token not provided.' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Authentication failed. Invalid token.' });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { authenticateToken };
