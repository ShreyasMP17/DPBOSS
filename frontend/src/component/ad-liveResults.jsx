import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import "../styles/extra.css";
import axios from "axios";
import AdminNavbar from "./adminNavbar";

const AddLiveResult = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

 const [updateLottery, setUpdateLottery] = useState({});
  // Fetch Today's Data
  useEffect(() => {
    const fetchLotteryData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-data");
        setLotteryData(response.data.data);
      } catch (err) {
        setError("Error fetching today's data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLotteryData();
  }, []);

 
  // Update Existing Lottery Entry
  const updateLotteryEntry = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/get-data/${id}`, updateLottery);
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
      await axios.delete(`http://localhost:3000/get-data/${id}`);
      setLotteryData(lotteryData.filter((item) => item._id !== id)); // Remove deleted lottery from state
    } catch (err) {
      setError("Error deleting lottery entry.");
    }
  };

  return (
    <div className="app-container">

        <AdminNavbar/>
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
              <button onClick={() => setUpdateLottery(data)}>Update Result</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AddLiveResult;
