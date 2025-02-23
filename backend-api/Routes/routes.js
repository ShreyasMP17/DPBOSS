const express = require('express');
const {
    getLottery,
    createLottery,
    getLotteryById,
    updateLottery,
    createWeekLottery,
    deleteWeekLottery,
    getLiveResults,
    updateWeeklyResult,
    deleteLottery
} = require('../Controller/user.controller');

const {
    createAdmin,
    loginAdmin,
    getAllAdmins
} = require('../Controller/adminLogin.controler');

const router = express.Router();

// Live Results Route
router.get('/lottery/live', getLiveResults);

// Lottery Routes
router.post('/lottery', createLottery);
router.get('/lottery', getLottery);
router.get('/lottery/:id', getLotteryById);
router.put('/lottery/:id', updateLottery);
router.delete('/lottery/:id', deleteLottery);

// Weekly Results Routes
router.post('/lottery/:id/weekly', createWeekLottery);
router.put('/lottery/:id/weekly', updateWeeklyResult);
router.delete('/lottery/:id/weekly', deleteWeekLottery);



// Admin Routes
router.post('/admin/register', createAdmin);
router.post('/admin/login', loginAdmin);
router.get('/admin/all', getAllAdmins);

module.exports = router;




// const express = require('express')
// const { getLottery,createLottery, getLotteryById, updateLottery,createWeekLottery, deleteWeekLottery, getLiveResults, editWeekLottery, deleteLottery, postWeek, updateWeek } = require('../Controller/user.controller')
// const{createAdmin,loginAdmin, getAllAdmins, } = require('../Controller/adminLogin.controler')
// const router = express.Router()

// router.post('/post-data', createLottery)
// router.get('/get-data', getLottery)
// router.post('/login', createAdmin)
// router.post('/loginadmin', loginAdmin)
// router.get('/admins',getAllAdmins)
// // router.get('/live-results', getLiveLottery);

// // router.post('/admin-lottery', createLottery);
// // router.get('/get-data', getAllLottery);
// router.get('/get-data/:id', getLotteryById);
// router.put('/get-data/:id', updateLottery);
// router.delete('/get-data/:id', deleteLottery);
// router.post('/post-week/:id/weekly', createWeekLottery);
// router.delete("/lottery/:id/delete-week", deleteWeekLottery);

// router.put('/edit-week/:id/weekly', editWeekLottery);
// router.get('/live-data', getLiveResults);

// // router.put('/get-data/:id/', updateWeek)





// module.exports = router