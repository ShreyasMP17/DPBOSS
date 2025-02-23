import axios from "axios";

const API_URL = "http://localhost:3000/lottery"; 


// Fetch all lotteries
export const getLotteries = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new lottery
export const createLottery = async (lottery) => {
    const response = await axios.post(API_URL, lottery);
    return response.data;
};

// Update weekly results
export const updateWeeklyResults = async (id, week, updatedData) => {
    const response = await axios.put(`${API_URL}/${id}/weekly`, { week, updatedData });
    return response.data;
};

// Delete a lottery
export const deleteLottery = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
