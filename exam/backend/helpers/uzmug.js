const Umzug = require("umzug");
const path = require("path");
const db = require('../models');
module.exports.UzmugClient = new Umzug({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path.join(__dirname, '../migrations'),
        // inject sequelize's QueryInterface in the migrations
        params: [
            db.sequelize.getQueryInterface()
        ]
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    // named `SequelizeMeta`.
    storage: 'sequelize',
    storageOptions: {
        sequelize: db.sequelize
    }
});