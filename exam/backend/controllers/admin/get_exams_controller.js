const db = require('../../models') ;
const sequelize = require('sequelize') ;
const jwt = require('jsonwebtoken');
const utilities = require('../../helpers/utilities');

exports.byAgency = async ( req , res ) =>{
    try{
        let new_agency_id = req.body.agencyId ;
        let { count , rows } = await db.exams.findAndCountAll({
            where :{
                agencyId : new_agency_id
            },
            attributes: [ 'id' , 'name' ]
        });
        console.log(count) ;
        let exams = new Object() ;
        exams['examcount'] = count ;
        exams['examdata'] = rows ;
        res.status(200) ;
        res.send(exams) ;
    }
    catch(err){
        console.log( '401 ' + err  ) ;
        utilities.sendError(err, res);
    }
}