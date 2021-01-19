import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const NavBar = () => {
  const [state, setState] = useContext(AppContext);

  return (
    <header className="banner">
      <div className="logo">
        <img src="../../assets/img/theme/enyetech.png" />
      </div>
      <nav id="nav_bar" className="nav">
        <div className="humbarger">
          <div className="bars">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
        </div>
        <ul className="nav_link">
          <li>
            <Link to="#">Dashboard</Link>
          </li>
          <li>
            <Link to="#">Coupons</Link>
          </li>
          <li>
            <Link to="#">Invoices</Link>
          </li>
          <li>
            <Link to="#">Users</Link>
          </li>
        </ul>
      </nav>
      <span className="profile_name">{state.author}</span>
    </header>
  );
};

export default NavBar;
