import db from '../Db/db.js';
import { generateToken, verifyToken } from '../services/jwtService.js';

export const login = (req, res) => {
    /*
    * Handles user login by verifying the username and generating a JWT token.
    */
    const username = req.params.username;

    const query = "SELECT * FROM users WHERE username = ?";

    db.get(query, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        const token = generateToken(user);
        res.status(200).json({ message: "Login Successful", token: token, user: user });
    });
};

export const getUser = (req, res) => {
    /*
     * Retrieves a user from the database based on the provided user ID.
     */
    const userID = req.params.userID;

    const query = "SELECT * FROM users WHERE id = ?";

    db.get(query, [userID], (err, user) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        if (!user) {
            return res.status(400).json({ message: "User not found!" });
        }

        res.status(200).json({ message: "User found", user: user });
    });
};

export const validateToken = (req, res) => {
    /*
    * Validates the provided JWT token and returns the user ID if the token is valid.
    */
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        return res
            .status(200)
            .json({ message: "Token is valid", userID: decoded.id });
    } catch (error) {
        console.error(`Error validating token: ${error}`);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const getClients = (req, res) => {
    /*
    * Retrieves a list of clients based on the provided access level.
    */

    const accessLevel = req.params.accessLevel;

    const query = "SELECT * FROM clients WHERE access_level <= ?";

    db.all(query, [accessLevel], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        return res.status(200).json({ clients: rows });
    });
};

export const updateClient = (req, res) => {
    /*
    * Updates the details of a client in the database.
    */

    const id = req.body.id;

    const query =
        "UPDATE clients SET name=?, phone=?, email=?, address=?, postalcode=? WHERE id=?";

    db.all(
        query,[ req.body.username, req.body.phone, req.body.email, req.body.address, req.body.postalcode, id,], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ message: "Client updated successfull" });
        }
    );
};

export const registerClient = (req, res) => {
    /*
   * Registers a new client in the database.
   */
    const newUser = req.body;

    const query =
        "INSERT INTO clients (name, phone, email, address, postalcode, access_level) VALUES (?, ?, ?, ?, ?, ?)";

    db.all(
        query,[ newUser.name, newUser.phoneNumber, newUser.email, newUser.address, newUser.postalCode, newUser.accesslevel], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            return res.status(200).json({ message: "Client Register successfull!" });
        }
    );
};

export const deleteClient = (req, res) => {
    /*
    * Deletes a client from the database.
    */
    const clientId = req.params.clientId;

    const query = "DELETE FROM clients WHERE id = ?";

    db.all(query, [clientId], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting client" });
        }

        return res.status(200).json({ message: "Client deleted successfully" });
    });
};
