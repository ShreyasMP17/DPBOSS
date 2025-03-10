import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/extra.css";

const Demon = () => {
    const { id } = useParams(); // Get the id from the route
    const [week, setWeek] = useState("");
    const [data, setData] = useState({
        Monday: { left: [], result: "", right: [] },
        Tuesday: { left: [], result: "", right: [] },
        Wednesday: { left: [], result: "", right: [] },
        Thursday: { left: [], result: "", right: [] },
        Friday: { left: [], result: "", right: [] },
        Saturday: { left: [], result: "", right: [] },
        Sunday: { left: [], result: "", right: [] },
    });
    const [message, setMessage] = useState("");

    const handleChange = (day, field, value) => {
        setData((prevData) => ({
            ...prevData,
            [day]: {
                ...prevData[day],
                [field]: field === "result" ? value : value.split(","),
            },
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await 
                createWeekLottery(id,
                { week, data }
            );
            setMessage(response.data.message);
            alert("Data submitted successfully!");

            // Reset the form fields
            setWeek("");
            setData({
                Monday: { left: [], result: "", right: [] },
                Tuesday: { left: [], result: "", right: [] },
                Wednesday: { left: [], result: "", right: [] },
                Thursday: { left: [], result: "", right: [] },
                Friday: { left: [], result: "", right: [] },
                Saturday: { left: [], result: "", right: [] },
                Sunday: { left: [], result: "", right: [] },
            });
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <div>
            <h1>Post Weekly Result</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Week:</label>
                    <input
                        type="text"
                        value={week}
                        onChange={(e) => setWeek(e.target.value)}
                        placeholder="e.g., 02/01/2023 to 08/01/2023"
                        required
                    />
                </div>
                {Object.keys(data).map((day) => (
                    <div key={day}>
                        <h3>{day}</h3>
                        <label>Left:</label>
                        <input
                            type="text"
                            value={data[day].left.join(",")}
                            onChange={(e) => handleChange(day, "left", e.target.value)}
                            placeholder="Comma-separated values (e.g., 1,2,3)"
                        />
                        <br />
                        <label>Result:</label>
                        <input
                            type="text"
                            value={data[day].result}
                            onChange={(e) => handleChange(day, "result", e.target.value)}
                            placeholder="e.g., 76"
                        />
                        <br />
                        <label>Right:</label>
                        <input
                            type="text"
                            value={data[day].right.join(",")}
                            onChange={(e) => handleChange(day, "right", e.target.value)}
                            placeholder="Comma-separated values (e.g., 7,8,9)"
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Demon;