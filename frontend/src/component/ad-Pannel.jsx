import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/pannel.css";
import Logo from "./Logo"
import Footer from "./fotter"
import axios from "axios";

const AdminPannel = () => {
    const { id } = useParams();
  const [lotteryData, setLotteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name,setName]=useState(null);
  const[leftNo,setLeftNo]=useState(null);
  const[midNo,setMidNo]=useState(null);
  const[rightNo,setRightNo]=useState(null);

  useEffect(() => {
    const fetchWeeklyResults = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get-data");
        const data = response.data.data.find((item) => item.id === parseInt(id));
        setLotteryData(data ? data.weeklyResults : []);
        setName(data.name)
        setLeftNo(data.leftNo)
        setRightNo(data.rightNo)
        setMidNo(data.midNo)
      } catch (err) {
        setError("Error fetching weekly results");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyResults();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!lotteryData.length) {
    return <p>No weekly results available</p>;
  }

  const isResultDoubleDigits = (result) => {
    return result?.length === 2 && result[0] === result[1];
};


    return (
        <div>
            <div className="">
                <Logo/>
            </div>
            <div class="container-fluid">
		<div>
<h1 class="chart-h1">{name} PANEL CHART </h1>

	
<div id="top"></div>
<a href="#bottom" class="button2"> Go to Bottom </a>

<div className="pannel panel-info">
                <div className="panel-heading">
                    <h3> {name} MATKA PANNEL RECORD 2019 - 2024</h3>
                </div>

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
                            {lotteryData.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.week}</td>
                                    {Object.keys(result.data).map((day, i) => {
                                        const dayData = result.data[day];
                                        const shouldHighlight = isResultDoubleDigits(dayData.result);
                                        return (
                                            <td key={i}>
                                                <div
                                                    className={`lottery-cell ${
                                                        shouldHighlight ? "highlight-red" : ""
                                                    }`}
                                                >
                                                    <div className="left-cell">
                                                        {dayData.left.map((num, idx) => (
                                                            <div key={idx}>{num}</div>
                                                        ))}
                                                    </div>
                                                    <div className="mid-cell">{dayData.result}</div>
                                                    <div className="right-cell">
                                                        {dayData.right.map((num, idx) => (
                                                            <div key={idx}>{num}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
<center>
	<div id="bottom"></div>
	<a href="#top" class="button2"> Go to Top </a>
</center>
{/* <p>
144</p> */}
<Footer/>

</div>
</div>
            
        </div>
         );
};

export default AdminPannel;