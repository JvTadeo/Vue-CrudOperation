import { verifyToken } from "../services/jwtService.js";

export const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;    

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Lock");
        return res.status(401).send({error: 'Invalid or missing authorization header'});
    }
        
    try{

        const decoded = authHeader.split(" ")[1];        
        
        req.user = decoded;
        console.log("Open");
        next();
        
    }catch(err){
        return res.status(401).send({error: 'Invalid or expired token'});
    }
}