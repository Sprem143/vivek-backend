const mongoose = require('mongoose');


// const db= async()=>{
//     await mongoose.connect('mongodb://127.0.0.1:27017/vivek')
//     .then(()=> console.log("Localhost Database cannected"))
//     .catch((err)=> console.log(err))
// }


const db= async()=>{
    await mongoose.connect('mongodb+srv://prem:Prem7366@website.6bysi.mongodb.net/?retryWrites=true&w=majority&appName=Website')
    .then(()=> console.log("Live Database cannected"))
    .catch((err)=> console.log(err))
}

module.exports= db;