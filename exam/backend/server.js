const express = require('express') ;
const cors = require('cors') ;
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

//testing addition of fields
// const jane = db.user.build({name: 'Jane', email: 'Doelana' , password: 'HASH' , role:1   });
// jane.save().then( () =>{
//   console.log('done' ) ;
// }).catch( (err) =>{
//   console.error('There is an error ' + err ) ;
// });

const authentication_router = require('./routes/authentication') ;
app.use('/authentication' , authentication_router ) ;
app.listen(port,() => 
    {console.log(`Server is running on port : ${port}`)}) ;