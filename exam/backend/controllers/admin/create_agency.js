const db = require('../../models') ;
const uuid = require('uuid');
const utilities = require('../../helpers/utilities');

module.exports.createAgency= async (req,res) => {
    let name = req.params.name;
    let data = db.agency.build({ id: uuid.v1(), name});
    try {
        await data.save();
        utilities.sendSuccess("",res);
    }
    catch (e) {
        console.log(e);
        utilities.sendError(e,res);
    }
}