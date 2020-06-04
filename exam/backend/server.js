const express = require('express') ;
const cors = require('cors');
require('dotenv').config() ;

const app = express() ;
const port = process.env.PORT || 5000 ;

app.use(cors()) ;
app.use(express.json()) ;

const db = require('./models') ;

db.sequelize.sync({force:false}).then( () =>{
  console.log('Database works fine') ;
}).catch( (err) =>{
  console.log('Error' + err ) ;
}) ;


let userRouter = require('./routes/user') ;
let orgAdminRouter = require('./routes/org_admin') ;
//app.use('/api', api);
app.use('/user' , userRouter ) ;
app.use('/' , orgAdminRouter ) ;
let newAgency = db.agency.build( {agency_id:1 , name : "resonance" }) ;
newAgency.save() ;
app.listen(port,() => 
    {console.log(`Server is running on port : ${port}`)}) ;



    // {
    //   "agency_id" : "1" , 
    //   "name" : "IIT" ,
    //   "details" : "Mains + Adnaced" ,
    //   "max_marks" : "360",
    //   "time" : "240" ,
    //   "avg_marks": "150" 
    // }	
    // {
    //   "name": "Resonance" ,
    //   "email": "resoran@resonance.com",
    //   "role":"1",
    //   "password":"bhakk"	
    //   }