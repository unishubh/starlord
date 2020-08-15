const express = require('express') ;
const Umzug = require('./helpers/uzmug');
const cors = require('cors');
require('dotenv').config() ;
const app = express() ;
const port = process.env.PORT || 5001 ;
const uuid =  require('uuid') ;
app.use(express.json()) ;
app.use(cors());

const db = require('./models') ;

db.sequelize.sync({force:false}).then( () =>{
  console.log('Database works fine') ;
}).catch( (err) =>{
  console.log('Error' + err ) ;
}) ;


let apiRouter = require('./routes/api') ;

app.use('/api', apiRouter);


Umzug.UzmugClient.pending().then(function(migrations) {
    // "migrations" will be an Array with the names of
    // pending migrations.
    Umzug.UzmugClient.execute({
        migrations: migrations,
        method: 'up'
    }).then(function(migrations) {
        // "migrations" will be an Array of all executed/reverted migrations.
        // start the server
        app.listen(port,() =>
        {console.log(`Server is running on port : ${port}`)}) ;
        // do your stuff
    });
});


//358ab7f0-b758-11ea-97e5-87ba4b5fa945

//300ea560-b759-11ea-97e5-87ba4b5fa945
    // {
    //   "agency_id" : "1" , 
    //   "name" : "IIT" ,
    //   "details" : "Mains + Adnaced" ,
    //   "max_marks" : "360",
    //   "time" : "240" ,
    //   "avg_marks": "150" 
    // }	
    // {
    //   "name" : "MockPaper1" ,
    //   "examId" : "1" ,
    //   "totalQns" : "10"
    // }
    // {
    //   "name": "Resonance" ,
    //   "email": "resoran@resonance.com",
    //   "role":"1",
    //   "password":"bhakk"	
    //   }