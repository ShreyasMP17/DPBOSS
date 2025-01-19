const mongoose = require('mongoose')

const AdminLogin = mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, { collection: 'adminlogins' });

module.exports = mongoose.model('adminLogin', AdminLogin)