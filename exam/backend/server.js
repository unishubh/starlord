const express = require('express') ;
const cors = require('cors');
const client = require('./db/scylla');

require('dotenv').config() ;

const app = express() ;
const port = process.env.PORT || 5000 ;

app.use(cors()) ;
app.use(express.json()) ;

const db = require('./models') ;

//SQL connection
db.sequelize.sync({force:false}).then( () =>{
  console.log('Database works fine') ;
}).catch( (err) =>{
  console.log('Error' + err ) ;
}) ;

//Scylla Connection
// client.connect().then( () => {
//     console.log("Connection to Scylla established");
//     client.client.execute("select * from users", (err, result) => {
//         if(err) console.log(err);
//         console.log(result)
//     })
// }).catch( (err) => {
//     console.log(err);
// })

let userRouter = require('./routes/user') ;
let orgAdminRouter = require('./routes/org_admin') ;

app.use('/user' , userRouter ) ;
app.use('/admin' , orgAdminRouter ) ;
app.listen(port,() => 
    {console.log(`Server is running on port : ${port}`)}) ;