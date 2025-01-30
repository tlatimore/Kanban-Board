import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    //  verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const jwtKey = process.env.JWT_SECRET_KEY || '';
    if (token) {
        jwt.verify(token, jwtKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            return next();
        });
    }
    else {
        res.sendStatus(401); // Unauthorized
    }
};
