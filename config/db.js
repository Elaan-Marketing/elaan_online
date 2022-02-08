const mongoose = require('mongoose');

function db(){
    mongoose.connect('mongodb://localhost:27017/elaan_online_temp',
    {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useNewUrlParser:true
    }).then(()=>{
        console.log('db connected');
    }).catch((err)=>{
        console.log(err+' failed to connect');
    });
}

module.exports = db;