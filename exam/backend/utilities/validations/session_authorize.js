const jwt = require('jsonwebtoken') ;
module.exports.basicAuth = async function (req, res, next) {

    // check for basic auth header
    console.log(req.headers.authorization) ;
    if (!req.headers.authorization ) {
        return res.status(401).json({ message: ' Missing Authorization Header' });
    }

    // verify auth credentials
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    //console.error(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        console.log(user);
        next();
    }); 
}