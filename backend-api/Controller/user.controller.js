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
        res.status(200).json({ statusCode: 200, data: lottery, message: "Data fetched successfully" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message, message: "Server error" });
    }
};

// Update a lottery by ID
const updateLottery = async (req, res) => {
    try {
        const updatedLottery = await Lottery.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLottery) return res.status(404).json({ message: "Lottery not found" });
        res.status(200).json({ message: "Lottery updated successfully", data: updatedLottery });
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message, message: "Server error" });
    }
};

// Delete a lottery by ID
const deleteLottery = async (req, res) => {
    try {
        const deletedLottery = await Lottery.findByIdAndDelete(req.params.id);
        if (!deletedLottery) return res.status(404).json({ message: "Lottery not found" });
        res.status(200).json({ message: "Lottery deleted successfully" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, error: error.message, message: "Server error" });
    }
};

const createWeekLottery = async (req, res) => {
    try {
        console.log("Received request:", req.body);
        console.log("Lottery ID:", req.params.id);

        const { week, data } = req.body;
        if (!week || !data) return res.status(400).json({ message: "Week and data are required" });
        if (!req.params.id) return res.status(400).json({ message: "Lottery ID is required" });

        const updatedLottery = await Lottery.findByIdAndUpdate(
            req.params.id,
            { $push: { weeklyResults: { week, data } } },
            { new: true, runValidators: true }
        );

        if (!updatedLottery) return res.status(404).json({ message: "Lottery not found" });

        res.status(200).json({ message: "Weekly result added successfully", data: updatedLottery });
    } catch (error) {
        console.error("❌ Error adding weekly result:", error);
        res.status(500).json({ statusCode: 500, error: error.message, message: "Failed to add weekly result" });
    }
};





const updateWeeklyResult = async (req, res) => {
    try {
        const { id } = req.params;
        const { week, updatedData } = req.body;

        // Find the lottery entry by ID
        const lottery = await Lottery.findById(id);
        if (!lottery) {
            return res.status(404).json({ message: "Lottery not found" });
        }

        // Find the specific week in `weeklyResults`
        const weekIndex = lottery.weeklyResults.findIndex((entry) => entry.week === week);
        if (weekIndex === -1) {
            return res.status(404).json({ message: "Week not found" });
        }

        // Update only the provided days' data in the existing weekly results
        Object.keys(updatedData).forEach((day) => {
            if (lottery.weeklyResults[weekIndex].data[day]) {
                lottery.weeklyResults[weekIndex].data[day] = {
                    ...lottery.weeklyResults[weekIndex].data[day], // Preserve existing fields
                    ...updatedData[day], // Apply updates for left, result, right
                };
            }
        });

        // Mark the modified field for proper MongoDB update tracking
        lottery.markModified(`weeklyResults.${weekIndex}.data`);

        // Save the updated lottery document
        await lottery.save();

        res.status(200).json({ message: "Weekly results updated successfully", data: lottery });
    } catch (error) {
        console.error("Error updating weekly results:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



const deleteWeekLottery = async (req, res) => {
    try {
        const { week } = req.body;
        
        if (!week) {
            return res.status(400).json({ message: "Week is required" });
        }

        console.log("📢 Deleting week:", week); // Debugging

        const updatedLottery = await Lottery.findByIdAndUpdate(
            req.params.id,
            { $pull: { weeklyResults: { week } } },
            { new: true }
        );

        if (!updatedLottery) {
            return res.status(404).json({ message: "Lottery not found" });
        }

        res.status(200).json({ message: "Week deleted successfully", data: updatedLottery });
    } catch (error) {
        console.error("❌ Error deleting week:", error.message);
        res.status(500).json({ statusCode: 500, error: error.message, message: "Failed to delete weekly result" });
    }
};



const getLiveResults = async (req, res) => {
    try {
        // Get current IST time correctly
        const currentTimeIST = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
        const currentIST = new Date(currentTimeIST);

        console.log("🕒 Current IST Time:", currentIST.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));

        // Fetch all lottery results from MongoDB
        const lotteries = await Lottery.find();

        // Filter results within ±30 minutes of `timeStart`
        const liveResults = lotteries.filter(lottery => {
            try {
                if (!lottery.timeStart) {
                    console.warn(`⚠️ Missing timeStart for ${lottery.name}`);
                    return false;
                }

                // Extract hours & minutes from `timeStart`
                const [time, period] = lottery.timeStart.split(" ");
                let [hours, minutes] = time.split(":").map(Number);

                // Convert 12-hour format to 24-hour format
                if (period === "PM" && hours !== 12) hours += 12;
                if (period === "AM" && hours === 12) hours = 0;

                // Create a Date object in IST with extracted time
                const startTime = new Date(currentIST);
                startTime.setHours(hours, minutes, 0, 0);

                console.log(`🎰 Lottery: ${lottery.name}, Start Time: ${startTime.toLocaleTimeString()}`);

                // Define 30-minute before & after range
                const before30Min = new Date(startTime.getTime() - 30 * 60 * 1000);
                const after30Min = new Date(startTime.getTime() + 30 * 60 * 1000);

                // Check if the current IST time falls within the ±30-minute range
                return currentIST >= before30Min && currentIST <= after30Min;
            } catch (error) {
                console.error(`❌ Error processing lottery ${lottery.name}:`, error);
                return false;
            }
        });

        console.log("📢 Final Live Results:", liveResults);

        // Send response with properly formatted data
        res.status(200).json({
            statusCode: 200,
            data: liveResults.map(lottery => ({
                name: lottery.name,
                time: lottery.timeStart,
                result: `${lottery.leftNo}-${lottery.midNo}-${lottery.rightNo}`,
                createdAtIST: new Date(lottery.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
                updatedAtIST: new Date(lottery.updatedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            })),
            message: "Live results fetched successfully in IST time",
        });

    } catch (error) {
        console.error("❌ Error fetching live results:", error);
        res.status(500).json({
            statusCode: 500,
            error: error.message,
            message: "Server error",
        });
    }
};





module.exports = { 
    getLottery, createLottery, updateLottery, getLotteryById, deleteLottery, 
    createWeekLottery, updateWeeklyResult, deleteWeekLottery, getLiveResults 
};


