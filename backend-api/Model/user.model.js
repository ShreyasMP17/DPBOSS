const mongoose = require('mongoose')


const weeklyResultSchema = new mongoose.Schema({
    week: { type: String, required: true },
    data: {
        Monday: { 
            left: [String], 
            result: String, 
            right: [String] 
        },
        Tuesday: { 
            left: [String], 
            result: String, 
            right: [String] 
        },
        Wednesday: { 
            left: [String], 
            result: String, 
            right: [String] 
        },
        Thursday: { 
            left: [String], 
            result: String, 
            right: [String] 
        },
        Friday: { 
            left: [String], 
            result: String, 
            right: [String] 
        },
        Saturday: { 
            left: [String], 
            result: String, 
            right: [String] 
        },
        Sunday: { 
            left: [String], 
            result: String, 
            right: [String] 
        }
    }
});


const Lottery = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    leftNo:{
        type: String,
        required: true
    },
    midNo:{
        type: String,
        required: true
    },
    rightNo:{
        type: String,
        required: true
    },
    timeStart:{
        type: String,
        required: true
    },
    timeEnd:{
        type: String,
        required: true
    },
    createdAt: { 
        type: Date, 
        default: Date.now // Automatically set the current date and time
    },
    weeklyResults:[weeklyResultSchema]
})

module.exports = new mongoose.model('Lottery',Lottery)

