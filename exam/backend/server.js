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
//app.use('/api', api);
app.use('/user' , userRouter ) ;


app.listen(port,() => 
    {console.log(`Server is running on port : ${port}`)}) ;