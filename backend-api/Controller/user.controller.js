const Lottery = require('../Model/user.model');

// Create a new lottery entry
const createLottery = async (req, res) => {
    try {
        const newLottery = new Lottery(req.body);
        await newLottery.save();
        res.status(201).json({ statusCode: 201, data: newLottery, message: "Lottery created successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, error: err.message, message: "Internal Server Error" });
    }
};

// Get all lotteries
const getLottery = async (req, res) => {
    try {
        const lotteries = await Lottery.find();
        res.status(200).json({ statusCode: 200, data: lotteries, message: "Data fetched successfully" });
    } catch (err) {
        res.status(500).json({ statusCode: 500, error: err.message, message: "Internal Server Error" });
    }
};

// Get a lottery by ID
const getLotteryById = async (req, res) => {
    try {
        const lottery = await Lottery.findById(req.params.id);
        if (!lottery) return res.status(404).json({ message: "Lottery not found" });
        res.status(200).json(lottery);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a lottery by ID
const updateLottery = async (req, res) => {
    try {
        const updatedLottery = await Lottery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLottery) return res.status(404).json({ message: "Lottery not found" });
        res.status(200).json({ message: "Lottery updated successfully", lottery: updatedLottery });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a lottery by ID
const deleteLottery = async (req, res) => {
    try {
        const deletedLottery = await Lottery.findByIdAndDelete(req.params.id);
        if (!deletedLottery) return res.status(404).json({ message: "Lottery not found" });
        res.status(200).json({ message: "Lottery deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Add weekly results to a lottery
const createWeekLottery = async (req, res) => {
    try {
        const { week, data } = req.body;
        if (!week || !data) return res.status(400).json({ message: "Week and data are required" });

        const updatedLottery = await Lottery.findByIdAndUpdate(
            req.params.id,
            { $push: { weeklyResults: { week, data } } },
            { new: true }
        );

        if (!updatedLottery) return res.status(404).json({ message: "Lottery not found" });
        res.status(200).json({ message: "Weekly result added successfully", data: updatedLottery });
    } catch (error) {
        res.status(500).json({ message: "Failed to add weekly result", error: error.message });
    }
};

// Edit weekly results
const editWeekLottery = async (req, res) => {
    try {
        const { week, data } = req.body;
        if (!week || !data) return res.status(400).json({ message: "Week and data are required" });

        const updatedLottery = await Lottery.findOneAndUpdate(
            { _id: req.params.id, "weeklyResults.week": week },
            { $set: { "weeklyResults.$.data": data } },
            { new: true }
        );

        if (!updatedLottery) return res.status(404).json({ message: "Week not found" });
        res.status(200).json({ message: "Weekly result updated successfully", data: updatedLottery });
    } catch (error) {
        res.status(500).json({ message: "Failed to update weekly result", error: error.message });
    }
};

// Delete a weekly result by week name
const deleteWeekLottery = async (req, res) => {
    try {
        const { week } = req.body;
        if (!week) return res.status(400).json({ message: "Week is required" });

        const updatedLottery = await Lottery.findByIdAndUpdate(
            req.params.id,
            { $pull: { weeklyResults: { week } } },
            { new: true }
        );

        if (!updatedLottery) return res.status(404).json({ message: "Lottery not found" });
        res.status(200).json({ message: "Week deleted successfully", data: updatedLottery });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete weekly result", error: error.message });
    }
};

const getLiveResults = async (req, res) => {
    try {
        const currentTime = new Date();
        const results = await Lottery.find();

        const liveResults = results
            .map((result) => {
                const timeStart = new Date(currentTime);
                const [time, period] = result.timeStart.split(" ");
                const [hours, minutes] = time.split(":");

                let parsedHours = parseInt(hours);
                if (period === "PM" && parsedHours !== 12) parsedHours += 12;
                if (period === "AM" && parsedHours === 12) parsedHours = 0;

                timeStart.setHours(parsedHours, parseInt(minutes), 0, 0);
                const timeStartWindow = new Date(timeStart.getTime() - 30 * 60 * 1000);
                const timeEndWindow = new Date(timeStart.getTime() + 30 * 60 * 1000);

                if (currentTime >= timeStartWindow && currentTime <= timeEndWindow) {
                    return { name: result.name, time: result.timeStart, result: `${result.leftNo}-${result.midNo}-${result.rightNo}` };
                }
                return null;
            })
            .filter(Boolean);

        res.status(200).json(liveResults);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { 
    getLottery, createLottery, updateLottery, getLotteryById, deleteLottery, 
    createWeekLottery, editWeekLottery, deleteWeekLottery, getLiveResults 
};


// const Lottery = require('../Model/user.model');

// //CREATE
// const createLottery = async(req,res)=>{
//     try{
//         const createData = new Lottery({
//             name: req.body.name,
//             leftNo: req.body.leftNo,
//             midNo:req.body.midNo,
//             rightNo:req.body.rightNo,
//             timeStart:req.body.timeStart,
//             timeEnd:req.body.timeEnd,
//         })
//         if(createData){
//             createData.save()
//             res.status(200).send({statusCode: 200, data: createData, MessageChannel: "Data Inserted Successfully."})
//         }else{
//             res.status(200).send({statusCode: 200, data:createData, MessageChannel: "Failed to insert data."})
//         }
//     }catch(err){
//         res.status(200).send({statusCode: 200, data: err, MessageChannel: "Internal Server Error."})
//     }
// }

// //READ
// const getLottery = async(req, res)=>{
//     try{
//         const getData = await Lottery.find()
//     if(getData){                
//         return res.status(200).send({status: 200, data: getData, MessageChannel:"Data fetched Successfully"})
//     }else{
//         return res.status(404).send({status: 404, data: getData, MessageChannel:"Failed to fetch data"})
//     }
//     }catch(err){
//         return res.status(500).send({status: 500, data:err, MessageChannel:"Internal Server Error"})
//     }
// }

//  const getLotteryById = async (req, res) => {
//         try {
//             const { id } = req.params;
//             const lottery = await Lottery.findById(id);

//             if (!lottery) {
//                 return res.status(404).json({ message: 'Lottery not found' });
//             }

//             res.status(200).json(lottery);
//         } catch (error) {
//             res.status(500).json({ message: 'Server error', error });
//         }
//     }

//     // Update a lottery entry by ID
//     const updateLottery = async (req, res) => {
//         try {
//             const { id } = req.params;
//             const updates = req.body;

//             const updatedLottery = await Lottery.findByIdAndUpdate(id, updates, { new: true });

//             if (!updatedLottery) {
//                 return res.status(404).json({ message: 'Lottery not found' });
//             }

//             res.status(200).json({ message: 'Lottery updated successfully', lottery: updatedLottery });
//         } catch (error) {
//             res.status(500).json({ message: 'Server error', error });
//         }
//     }

//     // Delete a lottery entry by ID
//     const deleteLottery = async (req, res) => {
//         try {
//             const { id } = req.params;

//             const deletedLottery = await Lottery.findByIdAndDelete(id);

//             if (!deletedLottery) {
//                 return res.status(404).json({ message: 'Lottery not found' });
//             }

//             res.status(200).json({ message: 'Lottery deleted successfully' });
//         } catch (error) {
//             res.status(500).json({ message: 'Server error', error });
//         }
//     }

   

// const createWeekLottery = async(req,res)=>{
//     try {
//         const { id } = req.params; // WeeklyResult document ID
//         const { week, data } = req.body; // Day to update and new data to add
//         if (!week || !data) {
//             return res.status(400).json({ message: "Week and data are required" });
//         }
//         // Check if the day exists and update it with new data
//         const updatedResult = await Lottery.findByIdAndUpdate(
//             id,
//             { $push: { weeklyResults: { week, data } } },
//             { new: true, runValidators: true }
//         );

//         if (!updatedResult) {
//             return res.status(404).json({ message: "Weekly result not found" });
//         }

//         res.status(200).json({
//             message: "Nested data updated successfully",
//             data: updatedResult,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to update nested data",
//             error: error.message,
//         });
//     }
// };


// const deleteWeekLottery = async (req, res) => {
//     try {
//         const { id } = req.params; // WeeklyResult document ID
//         const { week } = req.body; // Week to be deleted

//         if (!week) {
//             return res.status(400).json({ message: "Week is required" });
//         }

//         // Find and update the document by removing the specified week
//         const updatedResult = await Lottery.findByIdAndUpdate(
//             id,
//             { $pull: { weeklyResults: { week } } },
//             { new: true }
//         );

//         if (!updatedResult) {
//             return res.status(404).json({ message: "Weekly result not found" });
//         }

//         res.status(200).json({
//             message: "Week deleted successfully",
//             data: updatedResult,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to delete week",
//             error: error.message,
//         });
//     }
// };


// const editWeekLottery = async (req, res) => {
//     try {
//         const { id } = req.params; // WeeklyResult document ID
//         const { week, data } = req.body; // Week to identify and new data to update

//         if (!week || !data) {
//             return res.status(400).json({ message: "Week and data are required" });
//         }

//         // Update the specific week's data
//         const updatedResult = await Lottery.findOneAndUpdate(
//             { _id: id, "weeklyResults.week": week }, // Find document and specific week
//             { $set: { "weeklyResults.$.data": data } }, // Update the data for the matched week
//             { new: true, runValidators: true } // Return the updated document
//         );

//         if (!updatedResult) {
//             return res.status(404).json({ message: "Weekly result or week not found" });
//         }

//         res.status(200).json({
//             message: "Week data updated successfully",
//             data: updatedResult,
//         });
//     } catch (error) {
//         res.status(500).json({
//             message: "Failed to update week data",
//             error: error.message,
//         });
//     }
// };


//     // const getWeek = async (req, res) => {
//     //     const lottery = await Lottery.findById(req.params.id);
//     //     res.json({ data: lottery });
//     //   }
      
//       // const postWeek = async (req, res) => {
//       //   const { id } = req.params;
//       //   const { week, data } = req.body;
//       //   const lottery = await Lottery.findById(id);
//       //   lottery.weeklyResults.push({ week, data });
//       //   await lottery.save();
//       //   res.json({ record: { week, data } });
//       // }

//     //   const postWeek = async (req, res) => {
//     //     const { id } = req.params; // Lottery ID
//     //     const { week, data } = req.body; // New weekly data
    
//     //     try {
//     //         const lottery = await Lottery.findById(id);
//     //         if (!lottery) {
//     //             return res.status(404).json({ message: "Lottery not found" });
//     //         }
    
//     //         // Add the new week data
//     //         lottery.weeklyResults.push({ week, data });
//     //         await lottery.save();
    
//     //         res.status(200).json({ message: "Week data added successfully", weeklyResults: lottery.weeklyResults });
//     //     } catch (error) {
//     //         res.status(500).json({ message: "Internal server error", error });
//     //     }
//     // };
      
    
//     //   const updateWeek = async (req, res) => {
//     //     const { id, recordId } = req.params;
//     //     const updatedData = req.body;
//     //     const lottery = await Lottery.findById(id);
//     //     const record = lottery.weeklyResults.id(recordId);
//     //     Object.assign(record, updatedData);
//     //     await lottery.save();
//     //     res.json({ updatedRecord: record });
//     //   }


//     // const getLiveResults = async (req, res) => {
//     //     try {
//     //         const currentTime = new Date();
    
//     //         // Fetch all results from the database
//     //         const results = await Lottery.find();
    
//     //         // Prepare the live results based on the time logic
//     //         const liveResults = results
//     //             .map((result) => {
//     //                 // Parse the timeStart field into a Date object
//     //                 const timeStart = new Date();
//     //                 const [time, period] = result.timeStart.split(" ");
//     //                 const [hours, minutes] = time.split(":");
//     //                 let parsedHours = parseInt(hours);
    
//     //                 // Adjust hours based on AM/PM
//     //                 if (period === "PM" && parsedHours !== 12) {
//     //                     parsedHours += 12; // Convert PM hours to 24-hour format
//     //                 } else if (period === "AM" && parsedHours === 12) {
//     //                     parsedHours = 0; // Midnight case
//     //                 }
    
//     //                 timeStart.setHours(parsedHours, parseInt(minutes), 0, 0);
    
//     //                 // Calculate the 30 minutes before and after timeStart
//     //                 const timeStartWindow = new Date(timeStart.getTime() - 30 * 60 * 1000);
//     //                 const timeEndWindow = new Date(timeStart.getTime() + 30 * 60 * 1000);
    
//     //                 // Check if current time is within the ±30 minutes window
//     //                 if (currentTime >= timeStartWindow && currentTime <= timeEndWindow) {
//     //                     const isSameResult =
//     //                         result.leftNo === req.query.prevLeftNo &&
//     //                         result.midNo === req.query.prevMidNo &&
//     //                         result.rightNo === req.query.prevRightNo;
    
//     //                     return {
//     //                         name: result.name,
//     //                         result: isSameResult
//     //                             ? "Not Updated or Loading"
//     //                             : `${result.leftNo}-${result.midNo}-${result.rightNo}`,
//     //                     };
//     //                 } else {
//     //                     return null; // Exclude lotteries outside the time window
//     //                 }
//     //             })
//     //             .filter((item) => item !== null); // Remove null entries
    
//     //         res.status(200).json(liveResults);
//     //     } catch (error) {
//     //         res.status(500).json({ error: error.message });
//     //     }
//     // };
    
//     const getLiveResults = async (req, res) => {
//         try {
//             // Get the current time in IST (Indian Standard Time)
//             const currentTime = new Date();
//             currentTime.setMinutes(currentTime.getMinutes() + 330); // Convert UTC to IST
    
//             // Fetch all results from the database
//             const results = await Lottery.find();
    
//             // Prepare live results within ±30 minutes of disTime
//             const liveResults = results
//                 .map((result) => {
//                     // Parse `disTime` field into a Date object
//                     const timeStart = new Date(currentTime);
//                     const [time, period] = result.disTime.split(" ");
//                     const [hours, minutes] = time.split(":");
    
//                     let parsedHours = parseInt(hours);
    
//                     // Convert 12-hour AM/PM format to 24-hour format
//                     if (period === "PM" && parsedHours !== 12) {
//                         parsedHours += 12;
//                     } else if (period === "AM" && parsedHours === 12) {
//                         parsedHours = 0;
//                     }
    
//                     timeStart.setHours(parsedHours, parseInt(minutes), 0, 0);
    
//                     // Define ±30-minute window
//                     const timeStartWindow = new Date(timeStart.getTime() - 30 * 60 * 1000);
//                     const timeEndWindow = new Date(timeStart.getTime() + 30 * 60 * 1000);
    
//                     // Check if the current time falls within the window
//                     if (currentTime >= timeStartWindow && currentTime <= timeEndWindow) {
//                         return {
//                             name: result.name,
//                             time: result.disTime,
//                             result: result.result,
//                         };
//                     } else {
//                         return null; // Exclude results outside the time window
//                     }
//                 })
//                 .filter((item) => item !== null); // Remove null entries
    
//             res.status(200).json(liveResults);
//         } catch (error) {
//             res.status(500).json({ error: error.message });
//         }
//     };
    

  

// module.exports = { getLottery, createLottery,updateLottery,getLotteryById, deleteLottery, getLiveResults, createWeekLottery,deleteWeekLottery, editWeekLottery }