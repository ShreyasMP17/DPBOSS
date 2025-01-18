const mongoose = require('mongoose');

// Define schema for daily data
const dailyDataSchema = new mongoose.Schema({
  left: {
    type: [String], // Array of strings for left numbers
    required: true,
  },
  result: {
    type: String, // Single result value
    required: true,
  },
  right: {
    type: [String], // Array of strings for right numbers
    required: true,
  },
});

// Define schema for weekly results
const weeklyResultsSchema = new mongoose.Schema({
  week: {
    type: String, // Week duration as string
    required: true,
  },
  data: {
    Monday: { type: dailyDataSchema, required: true },
    Tuesday: { type: dailyDataSchema, required: true },
    Wednesday: { type: dailyDataSchema, required: true },
    Thursday: { type: dailyDataSchema, required: true },
    Friday: { type: dailyDataSchema, required: true },
    Saturday: { type: dailyDataSchema, required: true },
    Sunday: { type: dailyDataSchema, required: true },
  },
});

// Define the main admin lottery schema
const adminLotterySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  leftNo: {
    type: String,
    required: true,
  },
  midNo: {
    type: String,
    required: true,
  },
  rightNo: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
    required: true,
  },
  timeEnd: {
    type: String,
    required: true,
  },
  weeklyResults: {
    type: [weeklyResultsSchema], // Array of weekly results
    required: true,
  },
});

module.exports = mongoose.model('AdminLottery', adminLotterySchema);
