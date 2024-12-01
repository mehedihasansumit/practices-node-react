import jwt from 'jsonwebtoken';
import config from "./config.js";

export const authenticate = (req, res, next) => {
    try {
        const access_token = req.cookies.access_token;
        if (!access_token) return res.status(403).json({ error: "invalid user" });

        // verify jwt token
        const distructToken = access_token.split(' ')[1];
        const verifyToken = jwt.verify(distructToken, config.jwtSecret)
        if (!verifyToken) return res.status(403).json({ error: "invalid user toekn" });
        req.access_token_info = verifyToken;
        next()
    }
    catch (err) {
        return res.status(403).json({ error: err.message });
    }
} 