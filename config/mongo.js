const mongoose = require('mongoose')

const url = `mongodb://localhost:27017/wtsChat`

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log(">>>>>>>>>>DB Connected"))
.catch((err)=>console.log("<<<<<<<<<<<<<Error in Connection",err))

