import { verifyToken } from "../services/jwtService.js";


export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    /*
    * Middleware function that verifies the authorization header in the request and attaches the decoded user data to the request object.
    *
    * If the authorization header is missing or invalid, it returns a 401 Unauthorized response.
    * If the token is missing, invalid, or expired, it returns a 401 Unauthorized response.
    */

    /*
     * Checks if the request has a valid authorization header. If the header is missing or invalid, returns a 401 Unauthorized response.
     */
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .send({ error: "Invalid or missing authorization header" });
    }

    /*
     * Verifies the authorization token in the request and attaches the decoded user data to the request object.
     * If the token is missing, invalid, or expired, returns a 401 Unauthorized response.
     */
    try {
        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).send({ error: "Invalid or expired token" });
    }
};
