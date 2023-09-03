const express = require('express')
const { GetApi, RegisterUser,LoginUser } = require('./api.js')
const port = 3003

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

require('./config/mongo.js')

app.get('/',(req,res)=>{
    res.send("Welcome")
})
app.post('/api/register',RegisterUser)
app.post('/api/loginUser',LoginUser)

app.listen(port,()=>{
    console.log("Listening on port",port);
})


