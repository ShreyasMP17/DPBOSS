import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import "../styles/extra.css";
import axios from "axios";
import AdminNavbar from "./adminNavbar";
import { deleteWeekLottery, getAllLotteries } from "../api/lotteryApi";

const AdminLottery = () => {
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
  const [updateLottery, setUpdateLottery] = useState({});

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
  const createLottery = async () => {
    try {
      const response = await createLottery(newLottery);
      setLotteryData([...lotteryData, response.data.data]); // Add new lottery to state
      setNewLottery({ name: "", leftNo: "", midNo: "", rightNo: "", timeStart: "", timeEnd: "" }); // Reset form
    } catch (err) {
      setError("Error creating lottery entry.");
    }
  };

  // Update Existing Lottery Entry
  const updateLotteryEntry = async (id) => {
    try {
      const response = await updateLottery(id, updateLottery);
      setLotteryData(
        lotteryData.map((item) =>
          item._id === id ? { ...item, ...response.data.lottery } : item
        )
      ); // Update UI
      setUpdateLottery({}); // Reset update form
   alert("Lottery entry has been updated successfully!"); // Alert message
  } catch (err) {
    setError("Error updating lottery entry.");
    }
  };

  // Delete Lottery Entry
  const deleteLottery = async (id) => {
    try {
      await deleteWeekLottery(id);
      setLotteryData(lotteryData.filter((item) => item._id !== id)); // Remove deleted lottery from state
    } catch (err) {
      setError("Error deleting lottery entry.");
    }
  };

  return (
    <div className="app-container">
      
      <div>
        <Logo />
      </div>

      {/* Add New Lottery Form */}
      <div className="formData">
        <h3>Add New Lottery</h3>
        <input
          type="text"
          placeholder="Name"
          value={newLottery.name}
          onChange={(e) => setNewLottery({ ...newLottery, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Left No"
          value={newLottery.leftNo}
          onChange={(e) => setNewLottery({ ...newLottery, leftNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Mid No"
          value={newLottery.midNo}
          onChange={(e) => setNewLottery({ ...newLottery, midNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Right No"
          value={newLottery.rightNo}
          onChange={(e) => setNewLottery({ ...newLottery, rightNo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Start Time"
          value={newLottery.timeStart}
          onChange={(e) => setNewLottery({ ...newLottery, timeStart: e.target.value })}
        />
        <input
          type="text"
          placeholder="End Time"
          value={newLottery.timeEnd}
          onChange={(e) => setNewLottery({ ...newLottery, timeEnd: e.target.value })}
        />
        <button onClick={createLottery}>Create</button>
      </div>

      {/* Update Lottery Form */}
      {updateLottery._id && (
        <div className="form">
          <h3>Update Lottery</h3>
          <input
            type="text"
            placeholder="Name"
            value={updateLottery.name}
            onChange={(e) => setUpdateLottery({ ...updateLottery, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Left No"
            value={updateLottery.leftNo}
            onChange={(e) => setUpdateLottery({ ...updateLottery, leftNo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mid No"
            value={updateLottery.midNo}
            onChange={(e) => setUpdateLottery({ ...updateLottery, midNo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Right No"
            value={updateLottery.rightNo}
            onChange={(e) => setUpdateLottery({ ...updateLottery, rightNo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Start Time"
            value={updateLottery.timeStart}
            onChange={(e) => setUpdateLottery({ ...updateLottery, timeStart: e.target.value })}
          />
          <input
            type="text"
            placeholder="End Time"
            value={updateLottery.timeEnd}
            onChange={(e) => setUpdateLottery({ ...updateLottery, timeEnd: e.target.value })}
          />
          <button onClick={() => updateLotteryEntry(updateLottery._id)}>Update</button>
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {/* Display Lottery Data */}
      <div className="display">
        {loading ? (
          <p>Loading...</p>
        ) : (
          lotteryData.map((data) => (
            <div
              key={data._id}
              className={`mainData ${[4, 10, 17, 23].includes(data._id) ? "highlight" : ""}`}
            >
              <h4>{data.name}</h4>
              <span>
                {data.leftNo}-{data.midNo}-{data.rightNo}
              </span>
              <p>
                {data.timeStart}-{data.timeEnd}
              </p>
              <a href={`/jodi/${data.id}`} className="jodi">
                Jodi
              </a>
              
              <a href={`/lottery/${data.id}`} className="panel">
                 Pannel
              </a>
              
              {/* <button onClick={() => deleteLottery(data._id)}>Delete</button> */}
              <button onClick={() => setUpdateLottery(data)}>Add Result</button>
              <div className="addpanel">
              <a href={`/demon/${data._id}`} className="">
                Update Week
              </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminLottery;



