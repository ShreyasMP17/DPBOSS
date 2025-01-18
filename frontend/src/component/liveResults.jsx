// src/components/LiveResults.js
import { useEffect, useState } from "react";
import axios from "axios";

const LiveResults = () => {
  const [liveResults, setLiveResults] = useState([]); // Holds live results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchLiveResults = async () => {
      try {
        const response = await axios.get("http://localhost:3000/live-results");
        setLiveResults(response.data.data); // Update live results from backend
      } catch (err) {
        setError("Error fetching live results.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveResults();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>{error}</div>; // Show error message

  return (
    <div className="liveResult">
      <h4>☔ LIVE RESULT ☔</h4>
      <div className="lv-mc">Sabse Tezz Live Result Yahi Milega</div>
      {liveResults.map((lott) => (
        <div className="live-re" key={lott._id}>
          <span className="h8">{lott.name}</span>
          <span className="h9">
            {lott.status === "LOADING"
              ? "Loading..." // Show Loading if status is LOADING
              : `${lott.leftNo}-${lott.midNo}`} {/* Show data otherwise */}
          </span>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      ))}
    </div>
  );
};

export default LiveResults;
