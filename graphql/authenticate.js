const jwt = require('jsonwebtoken');

// Custom middleware function for authentication
const authenticate = async ({ req }) => {
  const token = req.headers.authorization;

  if (!token) {
    throw new Error('Unauthorized');
  }

  try {
    const decoded = jwt.verify(token, 'sursa');
    return { user: decoded }; // Attach user information to the context object
  } catch (error) {
    throw new Error('Invalid token');
  }
};
module.exports =authenticate;
