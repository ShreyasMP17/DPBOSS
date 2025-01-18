// Import the adminLogin model
const AdminLogin = require('../Model/admin_login.model'); // Adjust the path as needed
const adminLotterySchema = require('../Model/admin.model')
const dailyDataSchema = require('../Model/admin.model')
// Controller for handling admin login-related operations


    const createAdmin = async (req, res) => {
        try {
            const { username, password } = req.body;

            // Check if both username and password are provided
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            // Create a new admin instance
            const newAdmin = new AdminLogin({ username, password });

            // Save to database
            await newAdmin.save();

            res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    const loginAdmin = async(req, res)=>{
        try {
            const { username, password } = req.body;

            // Check if both username and password are provided
            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password are required' });
            }

            // Find admin by username
            const admin = await AdminLogin.findOne({ username });

            if (!admin) {
                return res.status(404).json({ message: 'Admin not found' });
            }

            // Check password (for simplicity, no hashing is used here; consider bcrypt for production use)
            if (admin.password !== password) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            res.status(200).json({ message: 'Login successful', admin });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
    // Handler for getting all admin users (optional)
    const getAllAdmins = async (req, res) => {
        try {
            const admins = await AdminLogin.find();
            res.status(200).json(admins);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }


     // Create a new lottery entry
     const createLottery= async(req,res)=>{
         try{
             const createData = new adminLotterySchema({
                 name: req.body.name,
                 leftNo: req.body.leftNo,
                 midNo:req.body.midNo,
                 rightNo:req.body.rightNo,
                 timeStart:req.body.timeStart,
                 timeEnd:req.body.timeEnd,
             })
             if(createData){
                 createData.save()
                 res.status(200).send({statusCode: 200, data: createData, MessageChannel: "Data Inserted Successfully."})
             }else{
                 res.status(200).send({statusCode: 200, data:createData, MessageChannel: "Failed to insert data."})
             }
         }catch(err){
             res.status(200).send({statusCode: 200, data: err, MessageChannel: "Internal Server Error."})
         }
     }
     //READ
     const getAllLottery=async(req, res)=>{
         try{
             const getData = await adminLotterySchema.find()
         if(getData){                
             return res.status(200).send({status: 200, data: getData, MessageChannel:"Data fetched Successfully"})
         }else{
             return res.status(404).send({status: 404, data: getData, MessageChannel:"Failed to fetch data"})
         }
         }catch(err){
             return res.status(500).send({status: 500, data:err, MessageChannel:"Internal Server Error"})
         }
     }
     
     

    // Get a lottery by ID
    const getLotteryById = async (req, res) => {
        try {
            const { id } = req.params;
            const lottery = await adminLotterySchema.findById(id);

            if (!lottery) {
                return res.status(404).json({ message: 'Lottery not found' });
            }

            res.status(200).json(lottery);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    // Update a lottery entry by ID
    const updateLottery = async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatedLottery = await adminLotterySchema.findByIdAndUpdate(id, updates, { new: true });

            if (!updatedLottery) {
                return res.status(404).json({ message: 'Lottery not found' });
            }

            res.status(200).json({ message: 'Lottery updated successfully', lottery: updatedLottery });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    // Delete a lottery entry by ID
    const deleteLottery = async (req, res) => {
        try {
            const { id } = req.params;

            const deletedLottery = await adminLotterySchema.findByIdAndDelete(id);

            if (!deletedLottery) {
                return res.status(404).json({ message: 'Lottery not found' });
            }

            res.status(200).json({ message: 'Lottery deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }

    module.exports = { createAdmin, getAllAdmins, loginAdmin,createLottery, updateLottery,getLotteryById, getAllLottery, deleteLottery }
