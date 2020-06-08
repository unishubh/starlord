const jwt = require('jsonwebtoken') ;
const db = require('../../models') ;

module.exports.basicAuth = async function (req, res, next) {

    // check for basic auth header
    console.log(req.headers.authorization) ;
    if (!req.headers.authorization ) {
        return res.status(401).json({ message: ' Missing Authorization Header' });
    }

    // verify auth credentials
    const token =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(token, 'base64').toString('ascii');
    console.error(credentials) ;
    jwt.verify(token, process.env.JWT_SECRET , (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        if (req.user.role === 1 )
            next();
        else
            return res.status(401).json({ message: 'Admin access denied' });     
        console.log(user);
        
    });
}

module.exports.isAccessible = async (field, value, agencyID) => {
    switch (field ){
        case 'paperID' : {
            try {
                let dbAgencyId = await db.mockpapers.findOne({
                    include: [
                        {
                            model: db.exams,
                            include: [
                                {
                                    model: db.agency,
                                }
                            ]
                        }
                    ],
                    where: {id:value},
                });
                return dbAgencyId === agencyID;
            }
            catch (e) {
                console.log(e);
                throw "no records found";
            }
        }
        default : {
            throw "invalid field to check authorization on";
        }
    }

}