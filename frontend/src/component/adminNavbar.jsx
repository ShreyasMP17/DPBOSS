import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AdminNavbar.css";

const AdminNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
       <div className="">
         <nav className="admin-navbar">
            {/* Logo */}
            <div className="logo">
                <Link to="#">
                    <img src="dplogo.png" alt="Logo" />
                </Link>
            </div>

            {/* Navigation Links */}
            <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
                <li>
                    <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/add-live-results" onClick={() => setIsMenuOpen(false)}>
                        Add Live Results
                    </Link>
                </li>
                <li>
                    <Link to="/add-weekly" onClick={() => setIsMenuOpen(false)}>
                        Add Weekly Results
                    </Link>
                </li>
                <li>
                    <Link to="/add-new" onClick={() => setIsMenuOpen(false)}>
                        Add New Lottery
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                        Logout
                    </Link>
                </li>
            </ul>

            {/* Hamburger Menu */}
            <div
                className="burger"
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
        </nav>
       </div>
    );
};

export default AdminNavbar;



// import { Link } from "react-router-dom";
// import "../styles/AdminNavbar.css"; // Import the CSS file for styling

// const AdminNavbar = () => {
//     return (
//         <nav className="admin-navbar">
//             <div className="logo">
//                 <Link to="/">
//                     <img src="/path-to-your-logo/logo.png" alt="Logo" />
//                 </Link>
//             </div>
//             <ul className="nav-links">
//                 <li>
//                     <Link to="/">HOME</Link>
//                 </li>
//                 <li>
//                     <Link to="/admin-add">Add</Link>
//                 </li>
//                 <li>
//                     <Link to="/">Logout</Link>
//                 </li>
//             </ul>
//             <div className="burger">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//             </div>
//         </nav>
//     );
// };

// export default AdminNavbar;