import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./component/AuthContext"; // Auth Provider for authentication
import PrivateRoute from "./component/PrivateRoute"; // Private route for protected pages

// Public Components
import Logo from "./component/Logo";
import LotteryHome from "./component/Lottery";
import ADM from "./component/ad-login"; // Login page
import Pannel from "./component/pannel";
import Jodi from "./component/jodi";
import Footer from "./component/fotter";
import NotFoundPage from "./component/404";

// SEO Components
import SEO from "./component/seo";
import StructuredData from "./component/seo2";

// Admin Components (Protected)
import AdminNavbar from "./component/adminNavbar";
import AdminLottery from "./component/admin-lottery";
import AdminPannel from "./component/ad-Pannel";
import WeekUpdate from "./component/ad-weekUpdate";
import AdminNewLottery from "./component/admin-addnew";
import AdminWeekLottery from "./component/admin-addweek";
import AddLiveResult from "./component/ad-liveResults";
import AdminHome from "./component/ad-home";
import AdminPan from "./component/AdminLottery";
import AdminPannelUpdate from "./component/admin-Pan";
import AdminRegister from "./component/ad-Reg";

function App() {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider for authentication context */}
      <div className="app">
        <SEO />
        <StructuredData />
        <BrowserRouter>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<LotteryHome />} />
            <Route path="/logo" element={<Logo />} />
            <Route path="/login" element={<ADM />} />
            <Route path="/lottery/:id" element={<Pannel />} />
            <Route path="/jodi/:id" element={<Jodi />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="*" element={<NotFoundPage />} />

            

            {/* Protected Admin Routes - Wrapped with PrivateRoute */}
            <Route path="/admin" element={<PrivateRoute><AdminHome /></PrivateRoute>} />
            <Route path="/admin-register" element={<PrivateRoute><AdminRegister /></PrivateRoute>} />
            <Route path="/admin-navbar" element={<PrivateRoute><AdminNavbar /></PrivateRoute>} />
            <Route path="/admin-lottery" element={<PrivateRoute><AdminLottery /></PrivateRoute>} />
            <Route path="/admin-weekly/:id" element={<PrivateRoute><AdminPannel /></PrivateRoute>} />
            <Route path="/add-new" element={<PrivateRoute><AdminNewLottery /></PrivateRoute>} />
            <Route path="/add-weekly" element={<PrivateRoute><AdminWeekLottery /></PrivateRoute>} />
            <Route path="/add-live-results" element={<PrivateRoute><AddLiveResult /></PrivateRoute>} />
            <Route path="/addpannel" element={<PrivateRoute><AdminPan /></PrivateRoute>} />
            <Route path="/pan-udp/:id" element={<AdminPannelUpdate />} />
            <Route path="/add-week/:id" element={<PrivateRoute><WeekUpdate /></PrivateRoute>} />

          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;























// import React from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./component/AuthContext"; // Import AuthProvider
// import PrivateRoute from "./component/PrivateRoute"; // Import PrivateRoute
// import Logo from "./component/Logo";
// import LotteryHome from "./component/Lottery";
// import ADM from "./component/ad-login"; // Login page
// import AdminNavbar from "./component/adminNavbar";
// import Pannel from "./component/pannel";
// import Jodi from "./component/jodi";
// import Footer from "./component/fotter";
// import AdminLottery from "./component/admin-lottery";
// import AdminPannel from "./component/ad-Pannel";
// import NotFoundPage from "./component/404"
// import WeekUpadte from "./component/ad-weekUpdate";
// import AdminNewLottery from "./component/admin-addnew";
// import AdminWeekLottery from "./component/admin-addweek";
// import AddLiveResult from "./component/ad-liveResults";
// import AdminHome from "./component/ad-home";
// import SEO from "./component/seo";
// import StructuredData from "./component/seo2";
// import AdminPan from "./component/AdminLottery";
// import AdminPannelUpdate from "./component/admin-Pan";
// import AdminRegister from "./component/ad-Reg";



// function App() {
//   return (
//     <AuthProvider> {/* Wrap the app with AuthProvider */}
//       <div className="app">
//         <SEO/>
//         <StructuredData/>
//         <BrowserRouter>
//           <Routes>
//             {/* Public Routes */}
//             <Route path="/add-week/:id" element={<WeekUpadte/>}/>
//             <Route path="/logo" element={<Logo />} />
//             <Route path="/login" element={<ADM />} />
//             <Route path="/" element={<LotteryHome />} />
//             <Route path="/lottery/:id" element={<Pannel />} />
//             <Route path="/jodi/:id" element={<Jodi />} />
//             <Route path="/pan-udp/:id" element={<AdminPannelUpdate />} />
//             <Route path="/footer" element={<Footer />} />
//             <Route path="*" element={<NotFoundPage />} />
//             {/* <Route path="/admin-navbar" element={<PrivateRoute><AdminNavbar /></PrivateRoute>} /> */}
//             <Route path="/admin-navbar" element={<AdminNavbar />} />
//             <Route path="/add-new" element={<AdminNewLottery />} />
//             <Route path="/add-weekly" element={<AdminWeekLottery/>} />
//             <Route path="/admin-pannel/:id" element={<AdminPannel/>} />
//             <Route path="/add-live-results" element={<AddLiveResult/>}/>
//             <Route path="/addpannel" element={<AdminPan />}/>
//             <Route path="/admin" element={<AdminHome/>}/>
//             <Route path="/admin-register" element={<AdminRegister />}/>
//             {/* Private/Admin Routes */}
//             <Route
//               path="/admin-lottery"
//               element={
//                 <AdminLottery />
//               }
//               // <PrivateRoute>
//                 //   <AdminLottery />
//                 // </PrivateRoute>
//             />
//             <Route
//               path="/admin-weekly/:id"
//               element={
                
//                   <AdminPannel />
                
//               }
//             />
//           </Routes>
//             {/* <Route
//               path="/admin-weekly/:id"
//               element={
//                 <PrivateRoute>
//                   <AdminPannel />
//                 </PrivateRoute>
//               }
//             />
//           </Routes> */}
//         </BrowserRouter>
//       </div>
//     </AuthProvider>
//   );
// }

// export default App;




