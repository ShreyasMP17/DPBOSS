import React, { useEffect, useState } from "react";
import Logo from "./Logo";
import "../styles/extra.css";
import axios from "axios";
import AdminNavbar from "./adminNavbar";

const AdminWeekLottery = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
//   const [newLottery, setNewLottery] = useState({
//     name: "",
//     leftNo: "",
//     midNo: "",
//     rightNo: "",
//     timeStart: "",
//     timeEnd: "",
//   });
//   const [updateLottery, setUpdateLottery] = useState({});

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

  

  return (
    <div className="app-container">
     <AdminNavbar/>
      {/* Add New Lottery Form */}
      
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
              
              <a href={`/admin-pannel/${data.id}`} className="panel">
                 Pannel
              </a>
              
              {/* <button onClick={() => deleteLottery(data._id)}>Delete</button> */}
              <div className="addpanel">
              <a href={`/add-week/${data._id}`} className="">
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

export default AdminWeekLottery;