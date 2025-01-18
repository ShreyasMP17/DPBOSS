import "../styles/LotteryHome.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";

const LotteryHome = () => {
  const [lotteryData, setLotteryData] = useState([]); // Today's data
  const [liveResults, setLiveResults] = useState([]); // Live results
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

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

  
  const today = new Date();

    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

  
    const fetchLiveData = async () => {
      try {
          const response = await axios.get('http://localhost:3000/live-data');
          setLiveResults(response.data);
          setLoading(false);
      } catch (err) {
          setError("Failed to fetch live data.");
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchLiveData();
      const interval = setInterval(fetchLiveData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  if (loading) {
      return <div>Loading...</div>;
  }

  if (error) {
      return <div>{error}</div>;
  }


    return (
        <div className="main">
            <div className=''>
              <Logo/>
              
            </div>
            <div className='heading'>
                <img src="/shiva.avif" alt="" />
                <p>!! Welcome to DP Bosservices !! Satta Matka Fast Result</p>
                <a href="https://wa.me/1234567890" target="_blank" class="whatsapp-button">Chat with Us</a>
            </div>
            <div class="text2">
                <h1 >Satta Matka DPBOSS Kalyan Matka Result</h1>
                <h2 >DPBOSSERVICES.IN is the No. 1 Matka Sites welcomes you full-heartedly. Here below you can find the perfect guess by the top guesser along with the Fast Matka Result too.  Aaj Ka Satta Kalyan Fix Single Jodi free update here you find top Matka Market of India Kalyan Main Milan Rajdhani* *kalyan Matka Tips *fast Matka Result *kalyan Main Rajdhani Matka Chart *Matka Guessing by DPBOSS By App Best Matka Site By DPBOSS </h2>
            </div>

            <div className='today'>
                <h3>Today Lucky Number</h3>
                <div class="goldenbox">
                    <div class="golden" >
                        <h4>Golden Ank</h4>
                        <p>4-9-2-7</p>
                    </div>
                    <div className='final'>
                        <h4>Final Ank</h4>
                        <div className="marquee-container">
                            <div className='marquee-content'>
                                <p>MILAN MORNING - 2</p>
                                <p>SRIDEVI - 8</p>
                                <p>KALYAN MORNING - 8</p>
                                <p>MADHURI - 8</p>
                                <p>SRIDEVI MORNING - 2</p>
                                <p>KARNATAKA DAY - 6</p>
                                <p>TIME BAZAR - 2</p>
                                <p>MILAN DAY - 2</p>
                                <p>KALYAN - 2</p>
                                <p>SRIDEVI NIGHT - 8</p>
                                <p>MADHURI NIGHT - 0</p>
                                <p>MILAN NIGHT - 4</p>
                                <p>RAJDHANI NIGHT - 6</p>
                                <p>MAIN BAZAR - 8</p>
                                <p>MUMBAI MORNING - 2</p>
                                <p>ALYAN NIGHT - 2</p>
                                <p>NAMASTHE - 8</p>
                                <p>OLD MAIN MUMBAI - 4</p>
                                <p>MADHUR DAY - 0</p>
                                <p>MADHUR NIGHT - 8</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="liveResult">
      <h4>☔LIVE RESULT☔</h4>
      <div className="lv-mc">Sabse Tezz Live Result Yahi Milega</div>
      {displayedData.map((lottery) =>
        lottery.status === "HIDE" ? null : (
          <div className="live-re" key={lottery.id}>
            <span className="h8">{lottery.name}</span>
            <span className="h9">
              {lottery.status === "LOADING"
                ? "Loading..."
                : `${lottery.leftNo}-${lottery.midNo}`}
            </span>
            <button onClick={() => window.location.reload()}>Refresh</button>
            {/* {lottery.status !== "LOADING" && (
              <div>सबसे तेज सबसे सही</div>
            )} */}
          {/* </div>
        )
      )}
    </div> */} 
    <div className="liveResult">
        <h4>☔ LIVE RESULT ☔</h4>
        <div className="lv-mc">Sabse Tezz Live Result Yahi Milega</div>
        
                <div>
                {liveResults.length === 0 ? (
                <p>No live results available at the moment.</p>
            ) : (
              <div className="">
                {liveResults.map((result, index) => (
                             
                                <div key={index} className="live-re">
                                  <span className="h8">{result.name}</span>
                                  <span className="h9">{result.result}</span>
                                  <button onClick={() => window.location.reload()}>Refresh</button>
                                </div>
                          
                        ))}
                
              </div>
            )}
                </div>
           
      </div>
            <div class="text5" >
                <span >☆ NOTICE ☆</span>
                अपना बाजार dpbosservices@gmail.com वेबसाइट में डलवाने  <br />
                के लिए आज ही हमें ईमेल करे  <br />
                <a href="mailto:dpbosservices@gmail.com">Email : dpbosservices@gmail.com</a>
                <br />
                शर्ते लागु
            </div>

            <div class="text6">KALYAN MATKA | MATKA RESULT | KALYAN MATKA TIPS | SATTA MATKA | MATKA.COM | MATKA PANA JODI
                TODAY | BATTA SATKA | MATKA PATTI JODI NUMBER | MATKA RESULTS | MATKA CHART | MATKA JODI | SATTA COM | FULL
                RATE GAME | MATKA GAME | MATKA WAPKA | ALL MATKA RESULT LIVE ONLINE | MATKA RESULT | KALYAN MATKA RESULT |
                DPBOSS MATKA 143 | MAIN MATKA</div>

            <h4 class="flyr24"> WORLD ME SABSE FAST SATTA MATKA RESULT </h4>
            <div className="display">
              {lotteryData.map((data)=>(
                
                  <div key={data.id}
               className={`mainData ${[4, 10, 17, 23].includes(data.id) ? 'highlight' : ''}`}>
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
         <a href={`/lottery/${data.id}`} className="panel">
           Panel
         </a>
       </div>
                
              ))}
  {/* {Array.isArray(lotteryData) && lotteryData.length > 0 ? (
    lotteryData.map((data) => (
      <div
       
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
        <a href={`/lottery/${data.id}`} className="panel">
          Panel
        </a>
      </div>
    ))
  ) : (
    <p>Loading data...</p> // Placeholder for when data is not yet available
  )} */}
</div>
            <div class="support">
                <p>Email for any inquiries Or Support:</p>
                <a href="mailto:dpbosservices@gmail.com">dpbosservices@gmail.com</a>
            </div>
            <div className='tricks'>
                <h4 className="trick">  EverGreen Trick Zone And Matka Tricks By DpBoss </h4>
            </div>
            <div class="sky-23"> <h4>Dpboss Special Game Zone</h4> <a href="#"> Dpboss Guessing Forum (Post) </a>

                <a href="#"> All market free fix game </a> <a href="#"> Ratan Khatri Fix Panel Chart </a> <a href="#"> Matka Final Number Trick Chart </a>
            </div>
            <div class="sky-23"><h4>Matka Jodi List</h4><a href="#">Matka Jodi Count Chart</a><a href="#">Dhanvarsha Daily Fix Open To Close</a><a href="#">Matka Jodi Family Chart</a><a href="#">Penal Count Chart</a><a href="#">Penal Total Chart</a><a href="#">All 220 Card List</a>
            </div>
            <div className='weekly'><h4>DpBoss Net Weekly Patti Or Penal Chart From 16-12-2024 To 22-12-2024 For Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai Royal Night
            </h4><p>1=&gt;119-579-470-146
                </p><p>2=&gt;589-129-570-138
                </p><p>3=&gt;157-166-346-689
                </p><p>4=&gt;257-680-455-590
                </p><p>5=&gt;249-168-366-122
                </p><p>6=&gt;169-268-556-178
                </p><p>7=&gt;467-115-269-160
                </p><p>8=&gt;567-125-260-378
                </p><p>9=&gt;126-469-478-225
                </p><p>0=&gt;145-550-668-370
                </p></div>
            <div className='weekly'>
                <h4>DpBoss Net Weekly Line Open Or Close From 16-12-2024 To 22-12-2024 For Kalyan, Milan, Kalyan Night, Rajdhani, Time, Main Bazar, Mumbai Royal Night
                </h4><p>Mon. 0-5-1-6
                </p><p>Tue. 2-7-4-9
                </p><p>Wed. 1-6-5-0
                </p><p>Thu. 3-8-4-9
                </p><p>Fri. 1-6-5-0
                </p><p>Sat. 2-7-4-9
                </p><p>Sun. 1-6-3-8
                </p></div>
            <div className='weekly'>
                <h4>DpBoss Net Weekly Jodi Chart From 16-12-2024 To 22-12-2024 For Kalyan Milan Kalyan Night, Rajdhani Time, Main Bazar, Mumbai Royal Night Market
            </h4><p>20 25 70 75
                </p><p>33 38 83 88
                </p><p>10 15 60 65
                </p><p>24 29 74 79
                </p><p>41 46 91 96
                </p><p>53 58 03 08
                </p></div>
                <div className="trick">
                <h4>FREE GAME ZONE OPEN-CLOSE</h4>
                </div>

                <div className="ocfg txta-1 rbd onmb gpg0">
  <div className='date'>
    <p className="k2w5">✔DATE:↬ : {formattedDate} 
 ↫</p>
    <span >FREE GUESSING DAILY</span>
    <h5 className="k2w5">OPEN TO CLOSE FIX ANK</h5>
    </div>
    <div className="d1635">
    <div className="oc-3a-69">
        <p className="g5a1">↪ MILAN MORNING
</p>
        <p className="l9w2v">
          1-6-2-7
</p>
          <p className="l9w2v">380-178-237-377-458
</p>
          <p className="l9w2v">12-17-62-67-21-26-71-76
        </p>
    </div>
    <div className="oc-3a-69">
        <p className="g5a1">↪ KALYAN MORNING 
</p>
        <p className="l9w2v">
          2-7-4-9
</p>
          <p className="l9w2v">138-133-220-270-126
</p>
          <p className="l9w2v">24-29-74-79-42-47-92-97
        </p>
    </div>
    <div className="oc-3a-69">
        <p className="g5a1">↪ TIME BAZAR
</p>
        <p className="l9w2v">
          *-*-*-*
</p>
          <p className="l9w2v">***-***-***-***-***
</p>
          <p className="l9w2v">**-**-**-**-**-**-**-**
        </p>
    </div>
    <div className="oc-3a-69">
        <p className="g5a1">↪ MILAN DAY
</p>
        <p className="l9w2v">
          *-*-*-*
</p>
          <p className="l9w2v">***-***-***-***-***
</p>
          <p className="l9w2v">**-**-**-**-**-**-**-**
        </p>
    </div>
    <div className="oc-3a-69">
        <p className="g5a1">↪ KALYAN
</p>
        <p className="l9w2v">
          *-*-*-*
</p>
          <p className="l9w2v">***-***-***-***-***
</p>
          <p className="l9w2v">**-**-**-**-**-**-**-**
        </p>
    </div>
    <div className="oc-3a-69">
        <p className="g5a1">↪ MILAN NIGHT
</p>
        <p className="l9w2v">
          *-*-*-*
</p>
          <p className="l9w2v">***-***-***-***-***
</p>
          <p className="l9w2v">**-**-**-**-**-**-**-**
        </p>
    </div>
    <div className="oc-3a-69">
        <p className="g5a1">↪ KALYAN NIGHT
</p>
        <p className="l9w2v">
          *-*-*-*
</p>
          <p className="l9w2v">***-***-***-***-***
</p>
          <p className="l9w2v">**-**-**-**-**-**-**-**
        </p>
    </div>
    <div className="oc-3a-69">
        <p className="g5a1">↪ RAJDHANI NIGHT
</p>
        <p className="l9w2v">
          *-*-*-*
</p>
          <p className="l9w2v">***-***-***-***-***
</p>
          <p className="l9w2v">**-**-**-**-**-**-**-**
        </p>
    </div>
    <div className="oc-3a-69">     
        <p className="g5a1">↪ MAIN BAZAR
</p>
        <p className="l9w2v">
          *-*-*-*
</p>
          <p className="l9w2v">***-***-***-***-***
</p>
          <p className="l9w2v">**-**-**-**-**-**-**-**
</p>
      </div>
        <div className="oc-3a-69">
            <p className="g5a1">↪ PUNA BAZAR</p>
            <p className="l9w2v">1-2-6-7</p>
              <p className="l9w2v">128-129-150-160</p>
              <p className="l9w2v">62-26-67-76</p>
              <p className="l9w2v"></p>
        </div>
        <div className="oc-3a-69">
            <p className="g5a1">↪ SRIDEVI NIGHT</p>
            <p className="l9w2v">1-5-6-9</p>
              <p className="l9w2v">146-230-178-478</p>
              <p className="l9w2v">11-16-55-50-66-61-99-94</p>
              <p className="l9w2v"></p>
        </div>
        <div className="oc-3a-69">
            <p className="g5a1">↪ OLD MAIN MUMBAI</p>
            <p className="l9w2v">7-9-4</p>
              <p className="l9w2v">269-250-149-590-340-234</p>
              <p className="l9w2v">71-76-41-46-91-96</p>
              <p className="l9w2v"></p>
        </div>
        <div className="oc-3a-69">
            <p className="g5a1">↪ PADMAVATI</p>
            <p className="l9w2v">2-4-7-9</p>
              <p className="l9w2v">228-338-377-900</p>
              <p className="l9w2v">21-43-76-90</p>
              <p className="l9w2v"></p>
        </div>
        <div className="oc-3a-69">
            <p className="g5a1">↪ KARNATAKA DAY</p>
            <p className="l9w2v">4-5-8</p>
              <p className="l9w2v">130-235-456-890-350-478</p>
              <p className="l9w2v">49-47-57-59-80-89</p>
              <p className="l9w2v">0-7-9</p>
        </div>
        <div className="oc-3a-69">
            <p className="g5a1">↪ SRIDEVI</p>
            <p className="l9w2v">3-4-7-0</p>
              <p className="l9w2v">120-130-160-190</p>
              <p className="l9w2v">39-34-44-49-74-79-04-09</p>
              <p className="l9w2v"></p>
        </div>
        <div className="oc-3a-69">
            <p className="g5a1">↪ PRABHAT</p>
            <p className="l9w2v">3-8-9-5</p>
              <p className="l9w2v">346-689-357-780-468-369-379-478</p>
              <p className="l9w2v">33-35-53-50-89-81-90-92</p>
              <p className="l9w2v"></p>
        </div>
  </div></div>

  <table width="100%" cellspacing="0" cellpadding="0" class="l-obj-giv">
  <tbody>
    <tr>
      <td colspan="9" class="v5a25">कल्याण</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">सोम</td>
 <td rowspan="2" class="v5a25-v85b">3</td>
      <td>689</td>
      <td rowspan="2" class="v5a25-v85b">5</td>
      <td>366</td>
      <td rowspan="2" class="v5a25-v85b">7</td>
      <td>223</td>
      <td rowspan="2" class="v5a25-v85b">8</td>
      <td>666</td>
    </tr><tr>
    <td>35</td>
      <td>53</td>
      <td>78</td>
      <td>87</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">मंगल</td>
 <td rowspan="2" class="v5a25-v85b">2</td>
      <td>156</td>
      <td rowspan="2" class="v5a25-v85b">7</td>
      <td>467</td>
      <td rowspan="2" class="v5a25-v85b">8</td>
      <td>477</td>
      <td rowspan="2" class="v5a25-v85b">9</td>
      <td>333</td>
    </tr><tr>
    <td>27</td>
      <td>72</td>
      <td>89</td>
      <td>98</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">बुध</td>
 <td rowspan="2" class="v5a25-v85b">3</td>
      <td>779</td>
      <td rowspan="2" class="v5a25-v85b">7</td>
      <td>359</td>
      <td rowspan="2" class="v5a25-v85b">8</td>
      <td>134</td>
      <td rowspan="2" class="v5a25-v85b">9</td>
      <td>478</td>
    </tr><tr>
    <td>37</td>
      <td>73</td>
      <td>89</td>
      <td>98</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">गुरु</td>
 <td rowspan="2" class="v5a25-v85b">3</td>
      <td>779</td>
      <td rowspan="2" class="v5a25-v85b">5</td>
      <td>168</td>
      <td rowspan="2" class="v5a25-v85b">7</td>
      <td>133</td>
      <td rowspan="2" class="v5a25-v85b">9</td>
      <td>388</td>
    </tr><tr>
    <td>35</td>
      <td>53</td>
      <td>79</td>
      <td>97</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">शुक्र</td>
 <td rowspan="2" class="v5a25-v85b">5</td>
      <td>122</td>
      <td rowspan="2" class="v5a25-v85b">6</td>
      <td>277</td>
      <td rowspan="2" class="v5a25-v85b">7</td>
      <td>269</td>
      <td rowspan="2" class="v5a25-v85b">8</td>
      <td>189</td>
    </tr><tr>
    <td>56</td>
      <td>65</td>
      <td>78</td>
      <td>87</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">शनि</td>
 <td rowspan="2" class="v5a25-v85b">2</td>
      <td>138</td>
      <td rowspan="2" class="v5a25-v85b">5</td>
      <td>122</td>
      <td rowspan="2" class="v5a25-v85b">7</td>
      <td>467</td>
      <td rowspan="2" class="v5a25-v85b">9</td>
      <td>234</td>
    </tr><tr>
    <td>25</td>
      <td>52</td>
      <td>79</td>
      <td>97</td>
    </tr>
</tbody>
</table>
<table width="100%" cellspacing="0" cellpadding="0" class="l-obj-giv">
  <tbody>
    <tr>
      <td colspan="9" class="v5a25">KALYAN NIGHT / MAIN BAZAR </td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">सोम</td>
      <td rowspan="2" class="v5a25-v85b">3</td>
      <td>445</td>
      <td rowspan="2" class="v5a25-v85b">6</td>
      <td>169</td>
      <td rowspan="2" class="v5a25-v85b">8</td>
      <td>990</td>
      <td rowspan="2" class="v5a25-v85b">9</td>
      <td>360</td>
    </tr><tr>
    <td>36</td>
      <td>63</td>
      <td>89</td>
      <td>98</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">मंगल</td>
      <td rowspan="2" class="v5a25-v85b">3</td>
      <td>148</td>
      <td rowspan="2" class="v5a25-v85b">4</td>
      <td>158</td>
      <td rowspan="2" class="v5a25-v85b">5</td>
      <td>690</td>
      <td rowspan="2" class="v5a25-v85b">6</td>
      <td>556</td>
    </tr><tr>
    <td>34</td>
      <td>43</td>
      <td>56</td>
      <td>65</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">बुध</td>
      <td rowspan="2" class="v5a25-v85b">0</td>
      <td>127</td>
      <td rowspan="2" class="v5a25-v85b">5</td>
      <td>339</td>
      <td rowspan="2" class="v5a25-v85b">8</td>
      <td>189</td>
      <td rowspan="2" class="v5a25-v85b">9</td>
      <td>568</td>
    </tr><tr>
    <td>05</td>
      <td>50</td>
      <td>89</td>
      <td>98</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">गुरु</td>
      <td rowspan="2" class="v5a25-v85b">2</td>
      <td>246</td>
      <td rowspan="2" class="v5a25-v85b">5</td>
      <td>168</td>
      <td rowspan="2" class="v5a25-v85b">6</td>
      <td>222</td>
      <td rowspan="2" class="v5a25-v85b">7</td>
      <td>557</td>
    </tr><tr>
    <td>25</td>
      <td>52</td>
      <td>67</td>
      <td>76</td>
    </tr>
<tr><td rowspan="2" class="v5a25-v4a5">शुक्र</td>
      <td rowspan="2" class="v5a25-v85b">1</td>
      <td>560</td>
      <td rowspan="2" class="v5a25-v85b">6</td>
      <td>259</td>
      <td rowspan="2" class="v5a25-v85b">8</td>
      <td>260</td>
      <td rowspan="2" class="v5a25-v85b">9</td>
      <td>568</td>
    </tr><tr>
    <td>16</td>
      <td>61</td>
      <td>89</td>
      <td>98</td>
    </tr>
</tbody></table>
<div class="sta-div sta-1">
  <h6>SATTA MATKA JODI CHART</h6>
  <a href="#">Time Chart</a>
<a href="#">Sridevi Chart</a>
<a href="#">Kalyan Morning Chart</a>
<a href="#">Madhuri Chart</a>
<a href="#">Kalyan Chart</a>
<a href="#">Sridevi Night Chart</a>
<a href="#">Kalyan Night Chart</a>
<a href="#">Old Main Mumbai Chart</a>
<a href="#">Main Bazar Chart</a>
<a href="#">Milan Morning Chart</a>
<a href="#">Milan Day Chart</a>
<a href="#">Milan Night Chart</a>
<a href="#">Madhuri Night Chart</a>
<a href="#">Madhur Morning Chart</a>
<a href="#">Madhur Day Chart</a>
<a href="#">Madhur Night Chart</a>
<a href="#">Rajdhani Night Chart</a>
</div>
<div class="sta-div sta-1">
  <h6>MATKA PANEL CHART</h6>
  <a href="#">Time Panel Chart</a>
<a href="#">Sridevi Panel Chart</a>
<a href="#">Kalyan Morning Panel Chart</a>
<a href="#">Madhuri Penal Chart</a>
<a href="#">Padmavathi Penal Chart</a>
<a href="#">Kalyan Penal Chart</a>
<a href="#">Sridevi Night Penal Chart</a>
<a href="#">Kalyan Night Penal Chart</a>
<a href="#">Old Main Mumbai Panel Chart</a>
<a href="#">Main Bazar Penal Chart</a>
<a href="#">Milan Morning Panel Chart</a>
<a href="#">Milan Day Penal Chart</a>
<a href="#">Milan Night Penal Chart</a>
<a href="#">Madhuri Night Panel Chart</a>
<a href="#">Rajdhani Night Panel Chart</a>
<a href="#">Madhur Morning Day Chart</a>
<a href="#">Madhur Day Panel Chart</a>

</div>
    <div class="qtn14"> 
<h6>Introduction to DPBoss Service</h6>
<p>
Welcome to DPBoss, where entertainment takes center stage, and a world of diverse activities awaits you. In our vibrant community, we've crafted an experience beyond conventional platforms, offering a rich tapestry of entertainment for users with varied interests.
<br/><br/>
Discover the joy of connecting with like-minded individuals through our socializing features. Whether you're an extrovert seeking lively conversations or an introvert looking for a cozy virtual space, DPBoss is your go-to destination for meaningful connections.


<br/><br/>
DPBOSS.Service is your ultimate destination for everything related to the fascinating world of the Satta Matka. As the DPBOSS is a leading authority in the realm of Matka Games, this is your Go-To Platform for any reliable information along with accurate Matka Results and expert guidance obviously. Whether you are a pro or a newcomer player the comprehensive collection of resources such as Kalyan Matka, Matka Result, and Mumbai Matka, will provide you with the thrilling and immersive experience. Join us along and we will embark on this captivating adventure, where every matka number, matka chart, and matka games hold the potential to unlock fortunes. 


</p>

<div class="q-crd a25hc"> <label for="qtn141"> <span> HISTORY OF SATTA MATKA  </span> </label> <div class="g5v2a"> <p>The history of Satta Matka dates to the 1960s when it originated as a form of gambling in Mumbai, India. Initially, it involved betting on the opening and closing rates of cotton in the Bombay cotton exchange. The practice of placing bets on the fluctuating cotton rates attracted a significant number of people looking to try their luck.<br/>

As the popularity of this form of gambling grew, it expanded beyond the cotton exchange. The game underwent several modifications and evolved into a numbers-based betting system. Players began betting on random numbers ranging from 0 to 9, which were drawn from a Matka (earthen pot).<br/>
Along with time various Matka Markets came out known as Kalyan Matka, Mumbai Matka, Rajdhani Matka, Night Milan Matka, And Main Mumbai Matka, among others. Every market has their own set of rules and draws which provides player with different opportunities in the game. 
</p></div></div><div class="q-crd"> <label for="qtn142"> <span> TYPES OF SATTA MATKA </span> </label> <div class="g5v2a"> <p>Kalyan Matka: Kalyan Matka is one of the most popular variants of Satta Matak which focuses on betting that are based on opening and closing of cotton in the Bombay Cotton Exchange. They have their own rules of draws for the declaration of winning outcome. <br/>

Mumbai Matka: Mumbai Matka is the format of satta matka associated with Mumbai. The game includes various draw which helps player to place bet on different number and combinations. <br/>

Rajdhani Matka: It is another type of Matka which involves betting on number based which is upon the opening and closing rates of the cotton in the Rajdhani Cotton Exchange. <br/>

Night Milan Matka: It is another variant of Satta Matka which is played at the evening or the night hours which offers exciting benefits to player looking to try their luck after the sunset. <br/>

Main Mumbai Matka: It is officially focused on Mumbai with their own sets of rules, draws and betting options for the people interested in the Main Mumbai Market. <br/>

Gali Deshawar Matka: Gali Deshawar Matka is a specific variant of Satta Matka popular in certain regions of India. It involves betting on numbers and predicting the outcome based on the draw.<br/>

Milan Day Matka: Milan Day Matka is a daytime variant of Satta Matka, providing players with betting opportunities during the day, with its own set of rules and draws separate from the night games.
</p>
</div></div><div class="q-crd"> <label for="qtn143"> <span> THE BASICS OF MATKA: </span> </label> <div class="g5v2a"> <p>Matka game officially originated in India 1960s. It is a very popular lottery style which involves betting on number and combination and if the result drawn matched your combination the layer can win potential amount. The term "Satta" refers to "betting" in Hindi, while "Matka" means "Earthen Pot" in hindi, traditionally used to draw random numbers.<br/>

Game Format: The Satta Matka games are mainly played on the days when market are closed such as weekends or public holidays. It generally includes playing bets on set of numbers from 0 to 9 and the result is drawn randomly. <br/>

Betting Process: Players need to place bet on the comniation of number on the opening and closi times of the Satta Market. Bets placed are on different types of market and options which includes single Jodi (pair), patti (three-digit number), and more.<br/>

Matka Draw: The Matka Draw involves drawing any of the three numbers from 0 to 9 from the deck of cards. The numbers are made drawn twice so that it creates a two digit number such as number drawn are 5 and 3 then the result is 53. This process is repeated to obtain the second set of numbers.<br/>

Result Declaration: The Winning numbers are declared based on the different combination of two set numbers. As an example, as the first set is 53 whereas the second to be 46 then the result will be 53 x 46. Although mostly the result if od 2-digit number and of that the last digit is taken into consideration as the last digit is 6 the winning number is declared 6. <br/>

Payouts: Payouts in Satta Matka also varies depending on the various types of bets placed and the amount it includes. As different market has their own different payout ratios and if the player wins, they receive the predetermined amount multiplies by their betting amount. 
</p></div></div><div class="q-crd"> <label for="qtn144"> <span> DIFFERENT VARIANTS OF MATKA GAMES </span> </label> <div class="g5v2a"> <p>There are several variants of Matka Games that have emerged over time. Here are some of the popular ones:<br/>

Single: in this format the player needs to bet on the single digit from 0 to 9 and if there chosen number draws out, they win. <br/>

Jodi: In Jodi player need to choose two numbers so that they can form pair of number they need to choose from 00 to 99 and if there selected number is drawn out, they win. <br/>

Patti: Patti is a three-digit number variant where players bet on all three digits of the result. There are different types of patti bets, including single patti, double patti, and triple patti.<br/>

Half Sangam: Half Sangam is a kind of combination bet which includes one number chosen in front the list of numbers and pairs along with he other number from the second set. <br/>

Full Sangam: The Full sangam is just like the half sangam as player select two numbers from both set and if it is drawn, they win. <br/>
Cycle Patti: Cycle Patti is a variation where players bet on a set of three numbers in a specific order. If their selected cycle matches the result, they win.

</p></div></div><div class="q-crd"> <label for="qtn145"> <span>WHAT IS KALYAN MATKA AND ITS WINNING STRATEGY  </span> </label> <div class="g5v2a"> <p> Kalyan Matka is a popular form of gambling that originated in India, focusing on the opening, and closing rates of cotton traded on the Bombay Cotton Exchange. Over time, it has evolved into a game where players bet on numbers and combinations, like other Matka Games. Here are some tips for playing Kalyan Matka:

1.	Understand the game rules and different types of bets.<br/>
2.	Analyze past results for patterns, but remember that outcomes are based on chance.<br/>
3.	Set a budget and stick to it.<br/>
4.	Diversify your bets to minimize risks.<br/>
5.	Bet with reasonable amounts and avoid chasing losses.<br/>
6.	Control your emotions and make rational decisions.<br/>
7.	Stay updated with the latest information and market trends.
<br/>



</p></div></div></div>
    
<div class="be-stone">
            <div class="c-stone" >WHAT IS MUMBAI MATKA? </div>
            <p>The variant of the Matka gambling game which originated in Mumbai, India is known as Mumbai Matka. The game is specifically associated with the city of Mumbai and hence is known as the Mumbai Matka. As other Matka games Mumbai Matka also revolves around the number and combinations. 
</p>
            <div class="c-stone">WHAT IS RAJDHANI MATKA? </div>
            <p>Rajdhani Matka is a very popular matka game and variant of Matka gambling in India. The game involves betting on number and combinations in Rajdhani market as player places the bets on various options such as single number or pair or even the three-digit number before the result gets declared. The games revolve on the similar format of other Matka games where two sets of number are drawn at a random. Even if you want to know how the result is declared so the winning number are determined based on the combination of two sets as the last digit of their products is determined as the winning number. Also, while playing the game, it is  that you follow the local laws and regulations while participating in the Rajdhani Matka or any other Format of games. 
</p>
            <div class="c-stone">WHAT IS SATTA CHART ANALYSIS?</div>
            <p>The Satta Chart Analysis is the study of historical Satta Matka to identify the patterns along with trends and number of frequencies. By using this it helps in making decisions when you select a number or the combination for future bets. Although it is very  to remember that the outcomes are totally based on chances and analysis does not guarantee any accurate predictions. Also, you need to make sure you gamble responsibility within legal boundaries
            </p>
            <div class="c-stone">WHAT IS MATKA OPEN AND MATKA CLOSE? </div>
            <p>"Matka Open" is the first set of numbers that are announced or declared at the beginning of a specific Matka game. It represents the opening result or the initial set of winning numbers. "Matka Close" is the second set of numbers that are announced or declared at the end of the Matka game. It represents the closing result or the final set of winning numbers. The time interval between the Matka Open and Matka Close varies depending on the specific Matka game being played. It can range from a few minutes to several hours, depending on the rules and regulations of the Matka market or game. Players place their bets on different numbers or combinations before the Matka Open, and the winning numbers are determined by the Matka Close

            </p>
            <div class="c-stone">MATKA JODI ON dpbossss.services: COMBINING NUMBERS FOR WINNING BETS</div>
            <p>Matka Jodi is a term which is often used in Matka gambling to refer a combination of two mars that the player selected for their bets. The Jodi officially refers to the number which are combined to form single outcome. Below are few of the key points about the Matka Jodi:  <br/>

Number Combination: Players need to choose a number from 0 to 9 and combine them to create any pair as for example if they select 3 and 7 the Jodi would be 37.<br/>

Betting Process: Players have full right to place bet on different Jodi available in the Matka game. They can select the Jodi bases on previous games and strategies and its analysis. <br/>

Result Declaration: If talking about the result declaration then the Jodi is compared to the winning numbers and if the Jodi outcome matches the player who placed the bet wins the potential amount. As for example if the winning number is declared as 3 and 7 and the Jodi combination was 37 then it would be the winning combination. <br/>

Payouts: The payouts totally depend on the specific Matka Market and their associated odds with chosen Jodi. As different Jodi combinations may have various payout rates. 
</p>
            <div class="c-stone">BOMBAY SATTA GUESSING AND TIPS</div>
            <p>Bombay Satta which is also known as the Mumbai Satta or Mumbai Matka refers to various and historical Matka gambling scenes in Mumbai city. The Matka game was originally originated in 1960s and was centred around the cotton exchange market of the Mumbai which later became a very popular form of gambling. <br/>

In Bombay Satta players need to place bets on various combination of numbers which can range from single digit to three-digit numbers. And if you predict the right number, you can win a potential winning at the time of result declaration. These numbers are then declared as the "open" and "close" for the day.<br/>

Mumbai has been a great hub for Matka gambling since a long time now and has various Matka markets operating in different area of the city.  Some of the most known matka market are Kalyan Matka, Worli Matka. Milan Day and Rajdhani Night. And it is  to know that every Market has their own sets of rules and timing for the declaration of results. 
            </p>
            
        </div>
        <div class="qtn14">

<div class="q-crd a25hc"> 
<label for="qtn141"> 
<span> WHAT IS SATTA MATKA?  </span> 
</label> 
<div class="g5v2a"> 
<p>Satta Matka originated in India and is one of the popular forms of Lottery and gambling games. The game involves placing bets on different numbers and earning potential winning on the outcome.  </p></div>
</div>

<div class="q-crd"> <label for="qtn142"> <span> WHO IS DPBOSS </span> </label> <div class="g5v2a"> 
<p>DPBOSS is known for providing the best tips and guidance to players along with expert advice so that they can easily make informed decisions on placing bets on the numbers in their Matka Games. </p></div></div>



<div class="q-crd"> <label for="qtn143"> <span> HOW DOES MATKA WORK? </span> </label> <div class="g5v2a"> <p>In Matka, players need to choose a specific set of numbers from any predefined range and place bets on these numbers so that while any random number drawn if the number is the same the player chooses, they win. </p></div></div>

<div class="q-crd"> <label for="qtn144"> <span> WHAT IS KALYAN MATKA? </span> </label> <div class="g5v2a"> <p>Kalyan Matka is totally a variant of Satta Matka which mainly focuses on games based on opening and closing rates of cotton in the Bombay Cotton Exchange. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> HOW CAN I CHECK THE MATKA RESULT?  </span> </label> <div class="g5v2a"> <p> Matka results can be checked through various online platforms or websites that are totally dedicated to Satta Matka games. Various formats of Matka gaming results are declared on these platforms for ease. </p></div></div>

<div class="q-crd"> <label for="qtn145"> <span> WHAT IS MATKA CHART? </span> </label> <div class="g5v2a"> <p>The Matka Chart refers to the graphical representation of any previous result and trends which in Matka Game helps players analyze the patterns of drawing and make predictions for their future games. </p></div></div>



<div class="q-crd"> <label for="qtn145"> <span> WHAT IS THE DIFFERENCE BETWEEN MATKA AND SATTA?  </span> </label> <div class="g5v2a"> <p> Satta is a broad term that refers to any type of gambling games. The matka is a specific term which refers to a game involving betting on numbers that are drawn out from the Matka. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> WHAT ARE MATKA OPEN AND MATKA CLOSE? </span> </label> <div class="g5v2a"> <p> First and last numbers are referred to as the Matka Open and Matka Close, respectively which is drawn in any Matka Game. Even players can place bets on these numbers and win if they are potentially drawn out.</p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> WHAT ARE MATKA PANNA AND MATKA JODI? </span> </label> <div class="g5v2a"> <p> In Matka Panna it is all about the three-digit number which represents a panel whereas the Jodi represents to a pair of two digit number where players can place the bets on Panna or Jodi combinations to increase any chances of winning. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> WHAT IS FIX SATTA? </span> </label> <div class="g5v2a"> <p> Any predetermined or fixed set of numbers refers to the Fix Satta. It is very beneficial for the players who have access to the information as the outcomes are already redecided.  </p></div></div>

<div class="q-crd"> <label for="qtn145"> <span> WHAT IS LUCKY ONLINE MATKA? </span> </label> <div class="g5v2a"> <p> The Lucky Online Matka game refers to an online gaming platform where player can easily participate in the Matka Games and try their luck by placing various bets on numbers and combinations to win a huge amount. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> LIVE MATKA </span> </label> <div class="g5v2a"> <p> It is another variant of Satta Matka which involves real time streaming or updating of Matka Games which allows the player to witness the draw and there result at the real time which helps in providing more transparency and excitement among players to participate in it. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> GALI DESHAWAR MATKA </span> </label> <div class="g5v2a"> <p> It is one of the variants of Satta Matka Game which is popular in various regions of India and is known as Gali Deshawar Matka. It also includes the same strategy that is betting on the number and predicting the outcome based on the draw system. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> BOMBAY SATTA </span> </label> <div class="g5v2a"> <p> Bombay Satta refers to the Satta Matka game which is specifically tailored with the city of Mumbai or also Bombay. Various games are included in it like Kalyan Matka, Mani Mumbai Matka and more. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> SATTAMATKA TIPS</span> </label> <div class="g5v2a"> <p>SattaMatka tips are suggestions and strategies provided by the experts of the field and players to improve your chances of winning in the Matka game. The tips provided by the experts may include analyzing previous results or following patterns or using any mathematical calculations. </p></div></div>

<div class="q-crd"> <label for="qtn145"> <span> SATTA MATKA WORLD </span> </label> <div class="g5v2a"> <p> Satta Matka World refers to the vast community of players and websites which provides resources dedicated to satta matka. It encompasses all the online platforms, forums and informational hub which cater to gaming enthusiasts. If you want to provide any information, feel free to do it or areas you like to focus and we will tailor content according to your preferences. </p></div></div>


<div class="q-crd"> <label for="qtn145"> <span> सट्टा मटका क्या है? </span> </label> <div class="g5v2a"> <p> सट्टा मटका एक जुआ है जो भारत में उत्पन्न हुआ था, जिसमें न्यू यॉर्क कॉटन एक्सचेंज से मुंबई कॉटन एक्सचेंज की ओपनिंग और क्लोजिंग दरों पर सट्टा लगाई जाती थी।</p></div></div>

<div class="q-crd"> <label for="qtn145"> <span> सट्टा मटकाकैसे खेलें? </span> </label> <div class="g5v2a"> <p> सट्टा मटका में खेलने के लिए आपको नंबर चुनना होता है और उन पर सट्टा लगाना होता है। खेल में विभिन्न प्रारूप होते हैं, जैसे कि सिंगल, जोड़ी, पन्ना, और संगम।</p></div></div>

<div class="q-crd"> <label for="qtn145"> <span>सट्टा मटकामें जीतने के चांस कैसे बढ़ाएं?</span> </label> <div class="g5v2a"> <p> सट्टा मटका में जीतने के चांस को बढ़ाने के लिए नियमों को समझें, रुझानों का पालन करें, और जिम्मेदार जुआ खेलें।</p></div></div>

<div class="q-crd"> <label for="qtn145"> <span> कल्याण मटका क्या होता है? </span> </label> <div class="g5v2a"> <p> कल्याण मटका एक प्रकार का सट्टा मटका बाजार है जो भारत में खेला जाता है। इसमें विभिन्न प्रकार की बेट लगाई जाती है जैसे कि ओपन, क्लोज, जोड़ियाँ आदि।</p></div></div>

<div class="q-crd"> <label for="qtn145"> <span> मटका कैसे काम करता है? </span> </label> <div class="g5v2a"> <p> मटका में, खिलाड़ियों को किसी पूर्वनिर्धारित सीमा से एक विशिष्ट सेट के नंबर चुनने की आवश्यकता होती है और इन नंबरों पर सट्टा लगानी होती है, ताकि किसी भी रैंडम नंबर ड्रा होते समय यदि नंबर वही हो जिसे खिलाड़ी ने चुना है, तो वह जीतते हैं।</p></div></div>

<div class="q-crd"> <label for="qtn145"> <span> मटका के विशेष शब्द क्या है? </span> </label> <div class="g5v2a"> <p> <b>सिंगल: </b>सट्टे के लिए 0 से 9 तक का एक अकेला अंक। उदाहरण के लिए 1।
<b>जोड़ी/पेयर: </b>मटका के लिए 00 से 99 तक किसी भी दो अंकों का सेट, जैसे 63 या 84 इत्यादि।
<b>पट्टी/पन्ना: </b>एक तीन-अंकीय परिणाम जुआ परिणाम के रूप में आता है। सभी तीन-अंकीय राशि पट्टी/पन्ना होती है। केवल सीमित 3 अंकीय संख्याएँ प्रयोग की जाती हैं।</p></div></div>

</div>
<div class="lst-sec">
            <h6>MATKA</h6>
            <p>Madhur Matka | Satta Bazar | Satta Kurla | Satta Com | Satta Batta | Org Mobi Net In | Satta Master | Matka Game | Kapil Indian Matka | Matka Parivar 24 | Prabhat Matka | Tara Matka | Golden Matka | SattaMatka.Com | Madhur Matka satta result chart, satta khabar, matka India net, satakmatak, satta chart 2019, satta bazar result, satta live, satta bazar, satta matka Mumbai chart, satta live result, satta fast result, satta fast, satta today Number 10, <a href="https://satta.matka.mobi">Satta Matka</a></p>
        </div>
        <div class="dis12">
  <h6>-:DISCLAIMER:-</h6>
  <p>Visiting this site and browsing it is strictly recommended at your own risk. Every information available here is only according to informational purpose and based on astrology and number calculations. We are no associated or affiliated with any illegal Matka business. We make sure we follow all rules and regulations of the regions where you are accessing the website. There are also chances that the website may be banned in your area and after that if you are using it, you are solely dependable and responsible for any damage, loss or legal action taken. 
<br/>
If you are the one who does not like our disclaimer it is advised that you leave our website immediately. Copying of any information/contents posted on the website is strictly prohibited and against the law. 
</p>
</div>
<h6 class="pow-13">POWERD BY dpbossss.services</h6>
<div class="lst-sec">
<p>
© 2011 - 2024 dpbossss.services <br/> 
    <a href="#">About us</a> | <a href="#">Contact us</a> <br/>
    <a href="#">Privacy &amp; policy</a> | <a href="#">Term And Conditions</a>
  </p>
</div>
<button onclick="saveScrollPosition(); window.location.reload();" class="clk1-rld btm-clk1-f">REFRESH </button>
<a target="_blank" class="mp-clk1" href="#"><i>Matka Play</i></a>
        </div>







    );
}

export default LotteryHome;



