// // controllers/lotteryController.js
// const Lottery = require("../../Model/weekly");

// // Get all lottery data
//  const getWeekData = async (req, res) => {
//   try {
//     const lotteryData = await Lottery.find();
//     res.json({ data: lotteryData });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Get lottery data by ID
// const getWeekDataById = async (req, res) => {
//   try {
//     const lottery = await Lottery.findById(req.params.id);
//     if (!lottery) {
//       return res.status(404).json({ message: "Lottery data not found" });
//     }
//     res.json(lottery);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// // Create new lottery data
// const addWeekData = async (req, res) => {
//   try {
//     const newLotteryData = new Lottery(req.body);
//     await newLotteryData.save();
//     res.status(201).json(newLotteryData);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to add data" });
//   }
// };

// // Update lottery data by ID
// const updateWeekData = async (req, res) => {
//   try {
//     const updatedLottery = await Lottery.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedLottery) {
//       return res.status(404).json({ message: "Lottery data not found" });
//     }
//     res.json(updatedLottery);
//   } catch (error) {
//     res.status(400).json({ message: "Failed to update data" });
//   }
// };

// // Delete lottery data by ID
//  const deleteWeekData = async (req, res) => {
//   try {
//     const deletedLottery = await Lottery.findByIdAndDelete(req.params.id);
//     if (!deletedLottery) {
//       return res.status(404).json({ message: "Lottery data not found" });
//     }
//     res.json({ message: "Data successfully deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error" });
//   }
// };
