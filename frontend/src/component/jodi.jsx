import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/jodi.css";
import Logo from "./Logo"
import Footer from "./fotter"
import axios from "axios";

const Jodi = () => {
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
<h1 class="chart-h1">{name} JODI CHART </h1>
<div class="para3">
<h2 >{name} JODI RESULT CHART RECORDS </h2>
<p >Dpboss KALYAN {name} chart, KALYAN {name} chart, old KALYAN {name} chart, KALYAN MORNING pana patti chart, dpboss KALYAN MORNING, KALYAN {name} record, KALYAN {name} record, KALYAN {name} chart 2015, KALYAN {name} chart 2012, KALYAN {name} chart 2012 to 2023, KALYAN MORNING final ank, KALYAN {name} chart.co, KALYAN {name} chart matka, KALYAN {name} chart book, KALYAN MORNING matka chart, matka panel chart KALYAN MORNING, matka KALYAN MORNING chart, satta KALYAN MORNING chart panel, KALYAN MORNING state chart, KALYAN MORNING chart result, डीपी बॉस, सट्टा चार्ट, सट्टा मटका पैनल चार्ट, सट्टा मटका पैनल चार्ट, कल्याण मॉर्निंग मटका पैनल चार्ट, सट्टा मटका कल्याण मॉर्निंग चार्ट पैनल, कल्याण मॉर्निंग सट्टा चार्ट, कल्याण मॉर्निंग पैनल चार्ट</p>
</div>

<div class="chart-result">    
		<div>{name}</div>
		<span>{leftNo}-{midNo}-{rightNo}</span><br/>
		<a href="javascript:location.reload()">Refresh Result</a>
</div>
	
<div id="top"></div>
<a href="#bottom" class="button2"> Go to Bottom </a>

<div className="pannel panel-info">
                <div className="panel-heading">
                    <h3> {name} MATKA JODI RECORD 2019 - 2024</h3>
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
                                                    className={`lottery ${
                                                        shouldHighlight ? "highlight-red" : ""
                                                    }`}
                                                >
                                                    <div className="mid"><h1>{dayData.result}</h1></div>
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

            <div class="chart-result">    
		<div>{name}</div>
		<span>{leftNo}-{midNo}-{rightNo}</span><br/>
		<a href="javascript:location.reload()">Refresh Result</a>
</div>
<div class="container-fluid footer-text-div">
<p>DPBoss Services is a renowned platform that provides comprehensive and accurate information on {name} Panel Chart Records. As a trusted name in the world of online gaming and gambling, DPBoss has carved a niche for itself by delivering reliable and up-to-date data to enthusiasts seeking Milan {name} charts.</p>
<p>{name} Panel Chart Records serve as crucial tools for players and bettors looking to analyze trends and patterns in the {name} market. DPBoss understands the significance of this data in making informed decisions and strives to offer a user-friendly interface for easy navigation through the {name} Chart Records. DPBoss Services stands as a trustworthy companion for {name} enthusiasts, offering a seamless experience and valuable insights through its {name} Panel Chart Records section.</p>
<br/>
<div class="small-heading">{lotteryData.records} ONILINE</div>
<p>{lotteryData.des3}</p>
<br/>
<div class="faq-heading">Frequently Asked Questions (FAQs) For {lotteryData.records}:</div>
<p class="faq-title">Q1: How frequently are the {name} Panel Chart Records updated?</p>
<p class="faq-ans">We understand the importance of real-time data in the world of online gaming. Our {name} Panel Chart Records are updated regularly to ensure that you have access to the latest information. You can rely on DPBoss to keep you informed about the ever-changing dynamics of the game.</p>
<p class="faq-title">Q2: Is there any cost associated with accessing the {name} Panel Chart Records on DPBoss?</p>
<p class="faq-ans">No, accessing the {name} Panel Chart Records on DPBoss is absolutely free. We believe in providing a transparent and accessible platform for enthusiasts and players alike. Simply visit our website, and you can explore the comprehensive charts without any hidden charges.</p>
</div><br/>
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

export default Jodi;