import React, { useState } from "react";

const LotteryUpdater = () => {
  // Initial JSON data
  const [lotteryData, setLotteryData] = useState([
    {
      id: 1,
      name: "MILAN MORNING",
      leftNo: "340",
      midNo: "72",
      rightNo: "246",
      timeStart: "10:15 AM",
      timeEnd: "11:15 AM",
      jodi: "Jodi",
      panel: "/seidevi-pannel",
      updatedLeftNo: "",
      updatedMidNo: "",
      updatedRightNo: "",
    },
    // Add more entries if needed...
  ]);

  // Function to handle input changes
  const handleInputChange = (id, field, value) => {
    const updatedData = lotteryData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          [field]: value, // Dynamically update the field (updatedLeftNo, updatedMidNo, updatedRightNo)
        };
      }
      return item;
    });
    setLotteryData(updatedData);
  };

  return (
    <div>
      <h1>Lottery Updater</h1>
      {lotteryData.map((entry) => (
        <div key={entry.id} style={{ marginBottom: "20px" }}>
          <h3>{entry.name}</h3>
          <div>
            <label>
              Update LeftNo:{" "}
              <input
                type="text"
                value={entry.updatedLeftNo}
                onChange={(e) =>
                  handleInputChange(entry.id, "updatedLeftNo", e.target.value)
                }
              />
            </label>
          </div>
          <div>
            <label>
              Update MidNo:{" "}
              <input
                type="text"
                value={entry.updatedMidNo}
                onChange={(e) =>
                  handleInputChange(entry.id, "updatedMidNo", e.target.value)
                }
              />
            </label>
          </div>
          <div>
            <label>
              Update RightNo:{" "}
              <input
                type="text"
                value={entry.updatedRightNo}
                onChange={(e) =>
                  handleInputChange(entry.id, "updatedRightNo", e.target.value)
                }
              />
            </label>
          </div>
          <div>
            <strong>Updated Values:</strong>
            <p>LeftNo: {entry.updatedLeftNo || "Not Updated"}</p>
            <p>MidNo: {entry.updatedMidNo || "Not Updated"}</p>
            <p>RightNo: {entry.updatedRightNo || "Not Updated"}</p>
          </div>
        </div>
      ))}
      <h2>Final JSON Data:</h2>
      <pre>{JSON.stringify(lotteryData, null, 2)}</pre>
    </div>
  );
};

export default LotteryUpdater;
