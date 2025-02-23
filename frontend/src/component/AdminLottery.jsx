import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import "../styles/extra.css";
import { getAllLotteries } from "../api/lotteryApi";
import AdminNavbar from "./adminNavbar";


const AdminPan = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllLotteries();
        console.log("📌 API Response:", response.data);
        setLotteryData(response.data.data);
      } catch (error) {
        console.error("❌ Error fetching lotteries:", error);
        setError("Failed to fetch lottery data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!lotteryData.length) return <p>No lottery data available.</p>;

  return (
    <div className="app-container">
      <AdminNavbar/>

      <div className="display">
        {lotteryData.map((data) => (
          <div key={data._id} className={`mainData ${["4", "10", "17", "23"].includes(String(data._id)) ? "highlight" : ""}`}>
            <h4>{data.name}</h4>
            <span>{data.leftNo}-{data.midNo}-{data.rightNo}</span>
            <p>{data.timeStart}-{data.timeEnd}</p>
            <a href={`/jodi/${data.id}`} className="jodi">Jodi</a>
            <a href={`/pan-udp/${data._id}`} className="panel">Update Panel</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPan;
