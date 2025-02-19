// const mongoose = require('mongoose')


// const weeklyResultSchema = new mongoose.Schema({
//     week: { type: String, required: true },
//     data: {
//         Monday: { 
//             left: [String], 
//             result: String, 
//             right: [String] 
//         },
//         Tuesday: { 
//             left: [String], 
//             result: String, 
//             right: [String] 
//         },
//         Wednesday: { 
//             left: [String], 
//             result: String, 
//             right: [String] 
//         },
//         Thursday: { 
//             left: [String], 
//             result: String, 
//             right: [String] 
//         },
//         Friday: { 
//             left: [String], 
//             result: String, 
//             right: [String] 
//         },
//         Saturday: { 
//             left: [String], 
//             result: String, 
//             right: [String] 
//         },
//         Sunday: { 
//             left: [String], 
//             result: String, 
//             right: [String] 
//         }
//     }
// });


// const Lottery = mongoose.Schema({
//     name:{
//         type: String,
//         required: true
//     },
//     leftNo:{
//         type: String,
//         required: true
//     },
//     midNo:{
//         type: String,
//         required: true
//     },
//     rightNo:{
//         type: String,
//         required: true
//     },
//     timeStart:{
//         type: String,
//         required: true
//     },
//     timeEnd:{
//         type: String,
//         required: true
//     },
//     createdAt: { 
//         type: Date, 
//         default: Date.now // Automatically set the current date and time
//     },
//     weeklyResults:[weeklyResultSchema]
// }, { collection: 'Lotteries' });

// module.exports = new mongoose.model('Lottery',Lottery)


const mongoose = require('mongoose');

// Weekly result schema
const weeklyResultSchema = new mongoose.Schema({
    week: { type: String, required: true },
    data: {
        Monday: { left: [String], result: String, right: [String] },
        Tuesday: { left: [String], result: String, right: [String] },
        Wednesday: { left: [String], result: String, right: [String] },
        Thursday: { left: [String], result: String, right: [String] },
        Friday: { left: [String], result: String, right: [String] },
        Saturday: { left: [String], result: String, right: [String] },
        Sunday: { left: [String], result: String, right: [String] }
    }
});

// Lottery schema
const lotterySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        leftNo: { type: String, required: true },
        midNo: { type: String, required: true },
        rightNo: { type: String, required: true },
        timeStart: { type: String, required: true },
        timeEnd: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        weeklyResults: [weeklyResultSchema] // Embedded schema for weekly results
    },
    { collection: 'Lotteries' } // Explicit collection name
);

const Lottery = mongoose.model('Lottery', lotterySchema);
module.exports = Lottery;


