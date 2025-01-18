import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./component/AuthContext"; // Import AuthProvider
import PrivateRoute from "./component/PrivateRoute"; // Import PrivateRoute
import Logo from "./component/Logo";
import LotteryHome from "./component/Lottery";
import ADM from "./component/ad-login"; // Login page
import AdminNavbar from "./component/adminNavbar";
import Pannel from "./component/pannel";
import Jodi from "./component/jodi";
import Footer from "./component/fotter";
import AdminLottery from "./component/admin-lottery";
import AdminPannel from "./component/ad-Pannel";
import NotFoundPage from "./component/404"
import WeekUpadte from "./component/ad-weekUpdate";
import AdminNewLottery from "./component/admin-addnew";
import AdminWeekLottery from "./component/admin-addweek";
import AddLiveResult from "./component/ad-liveResults";
import AdminHome from "./component/ad-home";


function App() {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <div className="app">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/add-week/:id" element={<WeekUpadte/>}/>
            <Route path="/logo" element={<Logo />} />
            <Route path="/login" element={<ADM />} />
            <Route path="/" element={<LotteryHome />} />
            <Route path="/lottery/:id" element={<Pannel />} />
            <Route path="/jodi/:id" element={<Jodi />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="*" element={<NotFoundPage />} />
            {/* <Route path="/admin-navbar" element={<PrivateRoute><AdminNavbar /></PrivateRoute>} /> */}
            <Route path="/admin-navbar" element={<AdminNavbar />} />
            <Route path="/add-new" element={<AdminNewLottery />} />
            <Route path="/add-weekly" element={<AdminWeekLottery/>} />
            <Route path="/admin-pannel/:id" element={<AdminPannel/>} />
            <Route path="/add-live-results" element={<AddLiveResult/>}/>

            <Route path="/admin" element={<AdminHome/>}/>
            {/* Private/Admin Routes */}
            <Route
              path="/admin-lottery"
              element={
                <AdminLottery />
              }
              // <PrivateRoute>
                //   <AdminLottery />
                // </PrivateRoute>
            />
            <Route
              path="/admin-weekly/:id"
              element={
                
                  <AdminPannel />
                
              }
            />
          </Routes>
            {/* <Route
              path="/admin-weekly/:id"
              element={
                <PrivateRoute>
                  <AdminPannel />
                </PrivateRoute>
              }
            />
          </Routes> */}
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;




// import { createContext, useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Logo from "./component/Logo";
// import LotteryHome from "./component/Lottery";
// import ADM from "./component/admLog"
// import AdminNavbar from "./component/adminNavbar"
// import Pannel from "./component/pannel"
// import Jodi from "./component/jodi"
// import Footer from "./component/fotter"
// import AdminLottery from "./component/admin-lottery"
// import AdminPannel from "./component/admin-weekly";






// function App() {

//   return (
//     <div className="app">
//         <BrowserRouter>
//         <Routes>
//           <Route path="/logo" element={<Logo/>} />
//           <Route path="/login" element={<ADM/>}/>/
//           <Route path="/admin-lottery" element={<AdminLottery/>}/>
//           <Route path="/admin-weekly/:id" element={<AdminPannel/>}/> 
//           <Route path="/" element={<LotteryHome />}/>
//           <Route path="/lottery/:id" element={<Pannel/>} />
//           <Route path="/jodi/:id" element={<Jodi/>} />
//           <Route path="/admin-navbar" element={<AdminNavbar/>}/>
//           <Route path="/footer" element={<Footer/>}/> 
//         </Routes>
//         </BrowserRouter>
//     </div>
//   );
// }
// export default App;
