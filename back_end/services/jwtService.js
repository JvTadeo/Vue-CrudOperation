import jwt from 'jsonwebtoken';

const secretKey = "750fa0fe-0fa8-44b0-bf41-60238eeeef1a";
const expiration = "3h";

const generateToken = (user) => {
  /*
  * Generates a JSON Web Token (JWT) for the provided user object.
  */

  return jwt.sign(user, secretKey, { expiresIn: expiration });
};

const verifyToken = (token) => {
  /*
  * Verifies the provided JWT token using the configured secret key.
  */
  return jwt.verify(token, secretKey);
};

export { generateToken, verifyToken };