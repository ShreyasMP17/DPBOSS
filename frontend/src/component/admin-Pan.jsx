import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/pannel.css";
import Footer from "./fotter";
import { getLotteryById, updateWeeklyResult, createWeekLottery, deleteWeekLottery } from "../api/lotteryApi"; // Import create API
import AdminNavbar from "./adminNavbar";

const AdminPannelUpdate = () => {
  const { id } = useParams();
  const [lotteryData, setLotteryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editWeek, setEditWeek] = useState(null);
  const [editDay, setEditDay] = useState(null);
  const [editData, setEditData] = useState({ left: [], result: "", right: [] });

  // Validate MongoDB ObjectId
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // Fetch Lottery Data
  useEffect(() => {
    if (!id || !isValidObjectId(id)) {
      setError("Invalid lottery ID format.");
      return;
    }

    const fetchLotteryData = async () => {
      setLoading(true);
      try {
        const response = await getLotteryById(id);
        console.log("📌 API Response:", response.data);
        setLotteryData(response.data.data || null);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
        setError("Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLotteryData();
  }, [id]);

  // Handle Edit
  const handleEdit = (week, day) => {
    if (!lotteryData || !Array.isArray(lotteryData.weeklyResults)) return;

    const selectedWeek = lotteryData.weeklyResults.find((result) => result.week === week);
    if (!selectedWeek || !selectedWeek.data[day]) return;

    setEditWeek(week);
    setEditDay(day);
    setEditData({
      left: selectedWeek.data[day].left || [],
      result: selectedWeek.data[day].result || "",
      right: selectedWeek.data[day].right || [],
    });
  };

  // Handle Input Changes
  const handleEditChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: field === "left" || field === "right" ? value.split(",").map((num) => num.trim()) : value,
    }));
  };

  // Handle Update
  const handleUpdate = async () => {
    if (!editWeek || !editDay || !editData) {
      alert("Please select a week and day to edit.");
      return;
    }

    try {
      const response = await updateWeeklyResult(id, {
        week: editWeek,
        updatedData: { [editDay]: editData },
      });

      console.log("✅ Update Success:", response.data);

      setLotteryData((prevData) => ({
        ...prevData,
        weeklyResults: prevData.weeklyResults.map((result) =>
          result.week === editWeek
            ? { ...result, data: { ...result.data, [editDay]: editData } }
            : result
        ),
      }));

      setEditWeek(null);
      setEditDay(null);
      setEditData({ left: [], result: "", right: [] });
      alert("Day updated successfully!");
    } catch (err) {
      console.error("❌ Update error:", err.response ? err.response.data : err.message);
      alert("Failed to update. Check console for details.");
    }
  };

  // Handle Create New Week
  const handleCreateWeek = async () => {
    const weekName = prompt("Enter the week name (e.g., 02/01/2023 to 08/01/2023):");
    if (!weekName) return;
  
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      alert("Invalid Lottery ID");
      return;
    }
  
    try {
      const response = await createWeekLottery(id, { week: weekName, data: {} });
      console.log("✅ Week Created:", response.data);
  
      // Update state with the newly created week
      setLotteryData((prevData) => ({
        ...prevData,
        weeklyResults: [...prevData.weeklyResults, { week: weekName, data: {} }],
      }));
  
      alert("New week created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("❌ Error creating week:", error.response ? error.response.data : error.message);
      alert("Failed to create a new week. Check console for details.");
    }
  };


   // Handle Delete Week
   const handleDeleteWeek = async (week) => {
    if (!week) {
      alert("Week is required!");
      return;
    }
  
    if (!window.confirm(`Are you sure you want to delete the week: ${week}?`)) return;
  
    try {
      console.log("📢 Sending delete request for week:", week);
  
      const response = await deleteWeekLottery(id, week);  // ✅ Pass "week" correctly
  
      console.log(`✅ Week ${week} deleted successfully`, response.data);
  
      setLotteryData((prevData) => ({
        ...prevData,
        weeklyResults: prevData.weeklyResults.filter((result) => result.week !== week),
      }));
  
      alert("Week deleted successfully!")
    } catch (error) {
      console.error("❌ Error deleting week:", error.response?.data || error.message);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };
  
  
  
  // Function to check if a result is double digits
  const isResultDoubleDigits = (result) => result?.length === 2 && result[0] === result[1];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!lotteryData) return <p>No data available</p>;

  return (
<div className="app-container">

<AdminNavbar/>
      <div className="container-fluid">
      
        <h1 className="chart-h1">{lotteryData.name} PANEL CHART</h1>

        <div className="pannel panel-info">
          <div className="panel-heading">
            <h3>{lotteryData.name} MATKA PANNEL RECORD 2019 - 2024</h3>
          </div>

          <button onClick={handleCreateWeek} className="create-btn">Create New Week</button>

          {editWeek && editDay && (
            <div className="edit-modal">
              <h2>Edit {editDay} for Week: {editWeek}</h2>
              <label>Left Numbers:</label>
              <input type="text" value={editData.left.join(", ")} onChange={(e) => handleEditChange("left", e.target.value)} />
              <label>Mid Result:</label>
              <input type="text" value={editData.result} onChange={(e) => handleEditChange("result", e.target.value)} />
              <label>Right Numbers:</label>
              <input type="text" value={editData.right.join(", ")} onChange={(e) => handleEditChange("right", e.target.value)} />
              <button onClick={handleUpdate} className="update-btn">Update</button>
              <button onClick={() => { setEditWeek(null); setEditDay(null); }} className="cancel-btn">Cancel</button>
            </div>
          )}

          <div className="panel-body">
            <table className="panel-chart chart-table" cellPadding="2">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                  <th>Sun</th>
                </tr>
              </thead>
              <tbody>
                {lotteryData.weeklyResults.map((result, index) => (
                  <tr key={index}>
                    <td>{result.week}</td>
                    {Object.keys(result.data).map((day, i) => {
                      const dayData = result.data[day];
                      const shouldHighlight = isResultDoubleDigits(dayData.result);
                      return (
                        <td key={i}>
                          <div className={`lottery-cell ${shouldHighlight ? "highlight-red" : ""}`}>
                            <div className="left-cell">{dayData.left.map((num, idx) => <div key={idx}>{num}</div>)}</div>
                            <div className="mid-cell">{dayData.result}</div>
                            <div className="right-cell">{dayData.right.map((num, idx) => <div key={idx}>{num}</div>)}</div>
                          </div>
                          <button onClick={() => handleEdit(result.week, day)} className="edit-btn">Edit</button>
                        </td>
                      );
                    })}
                    <td>
                      <button onClick={() => handleDeleteWeek(result.week)} className="delete-btn">Delete</button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminPannelUpdate;







