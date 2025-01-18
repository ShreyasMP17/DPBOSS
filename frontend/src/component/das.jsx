import '../styles/apple.css'

// const Das = () => {
//     return ( 
//         <div className="das">
            
//         </div>
//      );
// }
 
// export default Das;

// import React, { useEffect, useState } from "react";

// const Apple = () => {
//   const [lotteryData, setLotteryData] = useState([]);
//   const [previousResults, setPreviousResults] = useState([]);
//   const [currentTime, setCurrentTime] = useState(new Date());

//   // Helper function to parse time from string
//   const parseTime = (timeStr) => {
//     const [hour, minute, period] = timeStr
//       .replace(/[:\s]/g, " ")
//       .split(" ")
//       .map((x) => (isNaN(x) ? x : parseInt(x)));
//     let hours = period === "PM" && hour !== 12 ? hour + 12 : hour;
//     if (period === "AM" && hour === 12) hours = 0;
//     return new Date().setHours(hours, minute, 0, 0);
//   };

//   // Get filtered data based on conditions
//   const getFilteredData = () => {
//     return lotteryData
//       .map((lottery) => {
//         const startTime = new Date(parseTime(lottery.timeStart) - 30 * 60 * 1000); // 30 minutes before timeStart
//         const endTime = new Date(parseTime(lottery.timeStart) + 30 * 60 * 1000); // 30 minutes after timeStart

//         const previousLottery = previousResults.find(
//           (prev) => prev.id === lottery.id
//         );

//         // Compare with previous results
//         const isResultSame =
//           previousLottery &&
//           previousLottery.leftNo === lottery.leftNo &&
//           previousLottery.midNo === lottery.midNo &&
//           previousLottery.rightNo === lottery.rightNo;

//         if (currentTime >= startTime && currentTime <= endTime) {
//           // Show "Loading" if results are unchanged
//           if (isResultSame) {
//             return { ...lottery, status: "LOADING" };
//           } else {
//             return { ...lottery, status: "SHOW" }; // Show updated numbers
//           }
//         } else {
//           return { ...lottery, status: "HIDE" }; // Hide entries outside the time window
//         }
//       })
//       .filter((lottery) => lottery.status !== "HIDE"); // Remove entries outside the time window
//   };

//   // Effect to fetch lottery data
//   useEffect(() => {
//     const fetchLotteryData = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/lottery");
//         const data = await response.json();

//         // Store the current data as previous results for comparison
//         if (lotteryData.length >= 0) {
//           setPreviousResults([...lotteryData]);
//         }

//         setLotteryData(data);
//       } catch (error) {
//         console.error("Error fetching lottery data:", error);
//       }
//     };

//     fetchLotteryData();

//     // Update current time every minute
//     const timer = setInterval(() => setCurrentTime(new Date()), 60000);
//     return () => clearInterval(timer);
//   }, [lotteryData]);

//   // Get the displayed data
//   const displayedData = getFilteredData();

//   return (
//     <div>
//       <h1>Lottery Results</h1>
//       <ul>
//         {displayedData.map((lottery) => (
//           <li key={lottery.id}>
//             <h2>{lottery.name}</h2>
//             {lottery.status === "LOADING" && <p>Loading...</p>}
//             {lottery.status === "SHOW" && (
//               <p>
//                 Left: {lottery.leftNo}, Mid: {lottery.midNo}, Right:{" "}
//                 {lottery.rightNo}
//               </p>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Apple;



// import React, { useEffect, useState } from "react";


// const Apple = () => {
//   const [lotteryData, setLotteryData] = useState([]);
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     leftNo: "",
//     midNo: "",
//     rightNo: "",
//     timeStart: "",
//     timeEnd: "",
//     jodi: "",
//     panel: "",
//     startDate: "",
//     endDate: ""
//   });
//   const [editMode, setEditMode] = useState(false);

//   // Fetch data from JSON server
//   const fetchData = async () => {
//     try {
//       const response = await fetch("http://localhost:4000/lottery");
//       const data = await response.json();
//       setLotteryData(data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Add or Edit data
//   const handleSave = async () => {
//     if (editMode) {
//       // Edit existing entry
//       await fetch(`http://localhost:4000/lottery/${formData.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData)
//       });
//       setEditMode(false);
//     } else {
//       // Add new entry
//       await fetch("http://localhost:4000/lottery", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, id: Date.now() })
//       });
//     }
//     setFormData({
//       id: "",
//       name: "",
//       leftNo: "",
//       midNo: "",
//       rightNo: "",
//       timeStart: "",
//       timeEnd: "",
//       jodi: "",
//       panel: "",
//       startDate: "",
//       endDate: ""
//     });
//     fetchData();
//   };

//   // Edit button handler
//   const handleEdit = (item) => {
//     setEditMode(true);
//     setFormData(item);
//   };

//   // Delete button handler
//   const handleDelete = async (id) => {
//     await fetch(`http://localhost:4000/lottery/${id}`, {
//       method: "DELETE"
//     });
//     fetchData();
//   };

//   return (
//     <div className="app-container">
//       <h1>Lottery CRUD Application</h1>

//       <div className="form-container">
//         <h2>{editMode ? "Edit Lottery" : "Add Lottery"}</h2>
//         <form>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="leftNo"
//             placeholder="Left No"
//             value={formData.leftNo}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="midNo"
//             placeholder="Mid No"
//             value={formData.midNo}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="rightNo"
//             placeholder="Right No"
//             value={formData.rightNo}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="timeStart"
//             placeholder="Time Start"
//             value={formData.timeStart}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="timeEnd"
//             placeholder="Time End"
//             value={formData.timeEnd}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="jodi"
//             placeholder="Jodi"
//             value={formData.jodi}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="panel"
//             placeholder="Panel"
//             value={formData.panel}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="startDate"
//             placeholder="Start Date"
//             value={formData.startDate}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="endDate"
//             placeholder="End Date"
//             value={formData.endDate}
//             onChange={handleInputChange}
//           />
//           <button type="button" onClick={handleSave}>
//             {editMode ? "Update" : "Save"}
//           </button>
//         </form>
//       </div>

//       <div className="table-container">
//         <h2>Lottery List</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Left</th>
//               <th>Mid</th>
//               <th>Right</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {lotteryData.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{item.leftNo}</td>
//                 <td>{item.midNo}</td>
//                 <td>{item.rightNo}</td>
//                 <td>{item.timeStart}</td>
//                 <td>{item.timeEnd}</td>
//                 <td>
//                   <button onClick={() => handleEdit(item)}>Edit</button>
//                   <button onClick={() => handleDelete(item.id)}>Delete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Apple;


import React from "react";

// Corrected JSON data
const matkaData = [
  {
    "lottery": "MILAN MORNING",
    "leftNo": "840",
    "midNo": "72",
    "rightNo": "246",
    "timeStart": "10:15 AM",
    "timeEnd": "11:15 AM",
    "jodi": "Jodi",
    "panel": "/seidevi-pannel",
    "startDate": "22-04-2019",
    "endDate": "28-04-2019",
    "weeklyResults": [
      {
        "week": "22-04-2019 to 28-04-2019",
        "data": {
          "Monday": { "result": "84", "left": ["2", "8", "8"], "right": ["8", "4", "0"] },
          "Tuesday": { "result": "12", "left": ["2", "4", "8"], "right": ["2", "9", "0"] },
          "Wednesday": { "result": "30", "left": ["4", "8", "0"], "right": ["1", "2", "0"] },
          "Thursday": { "result": "44", "left": ["2", "3", "5"], "right": ["2", "5", "7"] },
          "Friday": { "result": "35", "left": ["2", "3", "9"], "right": ["2", "4", "7"] },
          "Saturday": { "result": "64", "left": ["7", "8", "0"], "right": ["7", "9", "0"] },
          "Sunday": { "result": "95", "left": ["4", "0", "0"], "right": ["1", "8", "0"] }
        }
      },
      // Add more weeks as needed...
    ]
  }
];

function MatkaTable() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Milan Morning Matka Panel Record (2019 - 2024)</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={styles.header}>Week</th>
            <th style={styles.header}>Monday</th>
            <th style={styles.header}>Tuesday</th>
            <th style={styles.header}>Wednesday</th>
            <th style={styles.header}>Thursday</th>
            <th style={styles.header}>Friday</th>
            <th style={styles.header}>Saturday</th>
            <th style={styles.header}>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {matkaData[0].weeklyResults.map((record, index) => (
            <tr key={index}>
              <td style={styles.cell}>{record.week}</td>
              {Object.keys(record.data).map((day, i) => (
                <td style={styles.cell} key={i}>
                  <div>{record.data[day].result}</div>
                  <div style={{ fontSize: "12px", color: "#666" }}>
                    (L: {record.data[day].left.join(", ")}, R: {record.data[day].right.join(", ")})
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  header: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
};

export default MatkaTable;


import React, { useEffect, useState } from "react";

function MatkaTable() {
  const [matkaData, setMatkaData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/MilanMorningPan");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMatkaData(data); // Assuming the response contains the array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Milan Morning Matka Panel Record (2019 - 2024)</h1>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={styles.header}>Week</th>
            <th style={styles.header}>Monday</th>
            <th style={styles.header}>Tuesday</th>
            <th style={styles.header}>Wednesday</th>
            <th style={styles.header}>Thursday</th>
            <th style={styles.header}>Friday</th>
            <th style={styles.header}>Saturday</th>
            <th style={styles.header}>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {matkaData.map((record) => (
            <tr key={record.id}>
              <td style={styles.cell}>{record.week}</td>
              {Object.keys(record.data).map((day) => (
                <td style={styles.cell} key={day}>
                  <div style={styles.result}>{record.data[day].result}</div>
                  <div style={styles.leftRight}>
                    <span style={styles.left}>{record.data[day].left}</span>
                    <span style={styles.right}>{record.data[day].right}</span>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  header: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    verticalAlign: "middle",
  },
  result: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "4px",
  },
  leftRight: {
    display: "flex",
    justifyContent: "space-between", // Aligns left and right to the edges
    fontSize: "12px",
    color: "#666",
  },
  left: {
    textAlign: "left",
    flex: "1",
  },
  right: {
    textAlign: "right",
    flex: "1",
  },
};

export default MatkaTable;




</thead>                	
                	<tbody>
      <tr> == "weeklyResults": [ 
        <td>12/12/2019<br/>to<br/>05/01/2020</td>  to json ==         { "week": "01/01/2018 to 07/01/2018",

          "data": {
            
      
<td class="">4<br/>8<br/>0</td>  
<td class="">26</td>
<td class="">3<br/>5<br/>8</td>  to json == "Monday": {"result": "26", "left": ["4", "8", "0"], "right": ["3", "5", "8"]},


<td class="">1<br/>4<br/>6</td>
<td class="">17</td>
<td class="">2<br/>5<br/>0</td> to json == "tuesday": {"result": "17", "left": ["1", "4", "6"], "right": ["2", "5", "0"]},


<td class="r">5<br/>5<br/>7</td>
<td class="r">77</td>
<td class="r">1<br/>8<br/>8</td> to json == "wednesday": {"result": "77", "left": ["5", "5", "7"], "right": ["1", "8", "8"]},


<td class="">2<br/>3<br/>9</td>
<td class="">48</td>
<td class="">2<br/>6<br/>0</td> to json == "thursday": {"result": "48", "left": ["2", "3", "9"], "right": ["0", "6", "0"]},


<td class="">1<br/>4<br/>0</td>
<td class="">52</td>
<td class="">1<br/>4<br/>7</td> to json == "friday": {"result": "52", "left": ["1", "4", "0"], "right": ["1", "4", "7"]},


<td class="">3<br/>4<br/>9</td>
<td class="">69</td>
<td class="">4<br/>5<br/>0</td> to json == "Saturday": {"result": "69", "left": ["3", "4", "9"], "right": ["4", "5", "0"]},


<td class="">2<br/>3<br/>4</td>
<td class="">92</td>
<td class="">6<br/>7<br/>9</td> to json == "sunday": {"result": "92", "left": ["2", "3", "4"], "right": ["6", "7", "9"]},

</tr>  to json == }}

