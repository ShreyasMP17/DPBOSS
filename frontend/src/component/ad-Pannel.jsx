import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/pannel.css";
import Logo from "./Logo";
import Footer from "./fotter";
import axios from "axios";
import { getAllLotteries, updateWeeklyResult } from "../api/lotteryApi";

const AdminPannel = () => {
    const { id } = useParams();
    const [lotteryData, setLotteryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState(null);
    const [editWeek, setEditWeek] = useState(null);
    const [editDay, setEditDay] = useState(null);
    const [editData, setEditData] = useState({ left: [], result: "", right: [] });

    useEffect(() => {
        const fetchWeeklyResults = async () => {
            try {
                const response = await getAllLotteries();
                const data = response.data.data.find((item) => item.id === parseInt(id));
                setLotteryData(data ? data.weeklyResults : []);
                setName(data.name);
            } catch (err) {
                setError("Error fetching weekly results");
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyResults();
    }, [id]);

    const handleEdit = (week, day) => {
        const selectedWeek = lotteryData.find((result) => result.week === week);
        if (!selectedWeek || !selectedWeek.data[day]) return;

        setEditWeek(week);
        setEditDay(day);
        setEditData({
            left: selectedWeek.data[day].left || [],
            result: selectedWeek.data[day].result || "",
            right: selectedWeek.data[day].right || [],
        });
    };

    const handleEditChange = (field, value) => {
        setEditData((prev) => ({
            ...prev,
            [field]: field === "left" || field === "right" ? value.split(",").map((num) => num.trim()) : value,
        }));
    };

    const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

if (!isValidObjectId(id)) {
    console.error("❌ Invalid ObjectId:", id);
    alert("Invalid lottery ID format.");
    return;
}

    const handleUpdate = async () => {
        if (!editWeek || !editDay || !editData) {
            alert("Please select a week and day to edit.");
            return;
        }
    
        if (!isValidObjectId(id)) {
            console.error("❌ Invalid ObjectId:", id);
            alert("Invalid lottery ID format.");
            return;
        }
    
        try {
            console.log("📌 Sending update request:", { week: editWeek, updatedData: { [editDay]: editData } });
    
            const response = await updateWeeklyResult(id, {
                week: editWeek,
                updatedData: { [editDay]: editData },
            });
    
            console.log("✅ Response received:", response.data);
    
            setLotteryData((prevData) =>
                prevData.map((result) =>
                    result.week === editWeek
                        ? { ...result, data: { ...result.data, [editDay]: editData } }
                        : result
                )
            );
    
            setEditWeek(null);
            setEditDay(null);
            setEditData({ left: [], result: "", right: [] });
            alert("Day updated successfully!");
        } catch (err) {
            console.error("❌ Update error:", err.response ? err.response.data : err.message);
            alert("Failed to update. Check console for details.");
        }
    };
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!lotteryData.length) return <p>No weekly results available</p>;

    return (
        <div>
            <Logo />
            <div className="container-fluid">
                <h1 className="chart-h1">{name} PANEL CHART</h1>
                <div className="pannel panel-info">
                    <div className="panel-heading">
                        <h3>{name} MATKA PANEL RECORD 2023 - 2025</h3>
                    </div>

                    {editWeek && editDay && (
                        <div className="edit-modal">
                            <h2>Edit {editDay} for Week: {editWeek}</h2>
                            <label>Left Numbers: </label>
                            <input
                                type="text"
                                value={editData.left.join(", ")}
                                onChange={(e) => handleEditChange("left", e.target.value)}
                            />
                            <label>Mid Result: </label>
                            <input
                                type="text"
                                value={editData.result}
                                onChange={(e) => handleEditChange("result", e.target.value)}
                            />
                            <label>Right Numbers: </label>
                            <input
                                type="text"
                                value={editData.right.join(", ")}
                                onChange={(e) => handleEditChange("right", e.target.value)}
                            />
                          <button onClick={() => {
    console.log("📌 Debugging editWeek:", editWeek);
    handleUpdate(editWeek, editDay, editData);
}} className="update-btn">Update</button>
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
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lotteryData.map((result, index) => (
                                    <tr key={index}>
                                        <td>{result.week}</td>
                                        {Object.keys(result.data).map((day, i) => (
                                            <td key={i}>
                                                <div className="lottery-cell">
                                                    <div className="left-cell">
                                                        {result.data[day].left.map((num, idx) => (
                                                            <div key={idx}>{num}</div>
                                                        ))}
                                                    </div>
                                                    <div className="mid-cell">{result.data[day].result}</div>
                                                    <div className="right-cell">
                                                        {result.data[day].right.map((num, idx) => (
                                                            <div key={idx}>{num}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <button onClick={() => handleEdit(result.week, day)} className="edit-btn">Edit</button>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminPannel;

