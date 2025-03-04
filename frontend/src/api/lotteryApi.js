import axios from "axios";

// const API_BASE_URL = "http://localhost:3000"; // Change this if your backend is hosted elsewhere
const API_BASE_URL = "https://dpbosservices.in:5000";


// Lottery API Calls
export const createLottery = async (lotteryData) => {
    return await axios.post(`${API_BASE_URL}/lottery`, lotteryData);
};

export const getAllLotteries = async () => {
    return await axios.get(`${API_BASE_URL}/lottery`);
};

export const getLotteryById = async (id) => {
    return await axios.get(`${API_BASE_URL}/lottery/${id}`);
};

export const updateLotteryData = async (id, lotteryData) => {
    return await axios.put(`${API_BASE_URL}/lottery/${id}`, lotteryData);
};

export const deleteLottery = async (id) => {
    return await axios.delete(`${API_BASE_URL}/lottery/${id}`);
};

// Weekly Results API Calls
export const createWeekLottery = async (id, weeklyData) => {
    return await axios.post(`${API_BASE_URL}/lottery/${id}/weekly`, weeklyData);
};

export const updateWeeklyResult = async (id, updatedData) => {
    return await axios.put(`${API_BASE_URL}/lottery/${id}/weekly`, updatedData);
};

export const deleteWeekLottery = async (id, week) => {
    return await axios.delete(`${API_BASE_URL}/lottery/${id}/weekly`, {
        headers: { "Content-Type": "application/json" },
        data: { week }  // ✅ Ensure "week" is included in the request body
    });
};


// Live Results API
export const getLiveResults = async () => {
    return await axios.get(`${API_BASE_URL}/lottery/live`);
};

// Admin API Calls
export const registerAdmin = async (adminData) => {
    return await axios.post(`${API_BASE_URL}/admin/register`, adminData);
};

export const loginAdmin = async (adminCredentials) => {
    return await axios.post(`${API_BASE_URL}/admin/login`, adminCredentials);
};

export const getAllAdmins = async () => {
    return await axios.get(`${API_BASE_URL}/admin/all`);
};
