const express = require('express') ;
const cors = require('cors');
require('dotenv').config() ;

const app = express() ;
const port = process.env.PORT || 5000 ;
const uuid =  require('uuid') ;
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
let examRouter = require('./routes/exam') ;
//app.use('/api', api);
app.use('/user' , userRouter ) ;
app.use('/admin' , orgAdminRouter ) ;
app.use('/exam' , examRouter ) ;
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
// let newattemptedpaper = db.attemptedpapers.build( { id:uuid.v4() , userID : "889c185d-0a66-40b3-8268-5b0d89491d52"  , paperID : "188fdaf0-ac30-11ea-9616-6babd85fe1ec"}) ;
// newattemptedpaper.save() ;
// d77bc8b0-abdc-11ea-853c-6920a6cec7ea
// dd009860-abdc-11ea-853c-6920a6cec7ea