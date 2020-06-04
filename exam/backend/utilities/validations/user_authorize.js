const db = require('../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken') ;

async function authenticate({ username, password }) {
    let user = await db.user.findOne({where: {email}});
    
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}