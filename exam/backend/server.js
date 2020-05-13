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

// testing addition of fields
// const jane = db.user.create({name: 'Jane', email: 'Doelana' , password: 'HASH' , role:1   }).then( (user) =>{
//   console.log('done' ) ;
// }).catch( (err) =>{
//   console.error('There is an error ' + err ) ;
// });

const register_router = require('./routes/register') ;
// const login_router = require('./routes/login')
app.use('/register' , register_router ) ;
// app.use('/login' , login_router ) ;
app.listen(port,() => 
    {console.log(`Server is running on port : ${port}`)}) ;