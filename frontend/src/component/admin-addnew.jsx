import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import "../styles/extra.css";
import axios from "axios";
import { createLottery as createLotteryAPI, getAllLotteries } from "../api/lotteryApi";
import AdminNavbar from "./adminNavbar";

const AdminNewLottery = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newLottery, setNewLottery] = useState({
    name: "",
    leftNo: "",
    midNo: "",
    rightNo: "",
    timeStart: "",
    timeEnd: "",
  });

  // Fetch Today's Data
  useEffect(() => {
    const fetchLotteryData = async () => {
      try {
        const response = await getAllLotteries();
        setLotteryData(response.data.data);
      } catch (err) {
        setError("Error fetching today's data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLotteryData();
  }, []);

  // Create New Lottery Entry
  const handleCreateLottery = async () => {
    // Validate input fields
    if (!newLottery.name || !newLottery.leftNo || !newLottery.midNo || !newLottery.rightNo || !newLottery.timeStart || !newLottery.timeEnd) {
      setError("All fields are required!");
      return;
    }

    try {
      setError(""); // Clear previous errors
      const response = await createLotteryAPI(newLottery);
      setLotteryData([...lotteryData, response.data]); // Update UI with new entry
      setNewLottery({ name: "", leftNo: "", midNo: "", rightNo: "", timeStart: "", timeEnd: "" }); // Reset form
      alert("Lottery created successfully!");
    } catch (err) {
      setError("Error creating lottery entry.");
    }
  };

  // Delete a lottery entry
  const deleteLottery = async (id) => {
    try {
      await axios.delete(`https://dpbosservices.in:5000/get-data/${id}`);
      setLotteryData(lotteryData.filter((item) => item._id !== id)); // Remove deleted lottery from state
    } catch (err) {
      setError("Error deleting lottery entry.");
    }
  };

  return (
    <div className="app-container">
      <AdminNavbar />
      <Logo />

      {/* Add New Lottery Form */}
      <div className="formData">
        <h3>Add New Lottery</h3>
        <input type="text" placeholder="Name" value={newLottery.name} onChange={(e) => setNewLottery({ ...newLottery, name: e.target.value })} />
        <input type="text" placeholder="Left No" value={newLottery.leftNo} onChange={(e) => setNewLottery({ ...newLottery, leftNo: e.target.value })} />
        <input type="text" placeholder="Mid No" value={newLottery.midNo} onChange={(e) => setNewLottery({ ...newLottery, midNo: e.target.value })} />
        <input type="text" placeholder="Right No" value={newLottery.rightNo} onChange={(e) => setNewLottery({ ...newLottery, rightNo: e.target.value })} />
        <input type="text" placeholder="Start Time" value={newLottery.timeStart} onChange={(e) => setNewLottery({ ...newLottery, timeStart: e.target.value })} />
        <input type="text" placeholder="End Time" value={newLottery.timeEnd} onChange={(e) => setNewLottery({ ...newLottery, timeEnd: e.target.value })} />
        <button onClick={handleCreateLottery}>Create</button>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Display Lottery Data */}
      <div className="display">
        {loading ? (
          <p>Loading...</p>
        ) : (
          lotteryData.map((data) => (
            <div key={data._id} className="mainData">
              <h4>{data.name}</h4>
              <span>{data.leftNo}-{data.midNo}-{data.rightNo}</span>
              <p>{data.timeStart}-{data.timeEnd}</p>
              <a href={`/jodi/${data._id}`} className="jodi">Jodi</a>
              <a href={`/lottery/${data._id}`} className="panel">Panel</a>
              {/* <button onClick={() => deleteLottery(data._id)}>Delete</button> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNewLottery;
