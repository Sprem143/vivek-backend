const mongoose = require('mongoose');


const db= async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/vivek')
    .then(()=> console.log("Localhost Database cannected"))
    .catch((err)=> console.log(err))
}


// const db= async()=>{
//     await mongoose.connect('mongodb+srv://Gstar:Gstar1456@cluster0.ks8az.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
//     .then(()=> console.log("Live Database cannected"))
//     .catch((err)=> console.log(err))
// }

module.exports= db;