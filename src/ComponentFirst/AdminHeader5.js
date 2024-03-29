import { React, useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router-dom";
import tCogLogoImg from "../Images/tCogLogo.png"
import ModalWithCSS from "./ModalWithCSS";

function AdminHeader5() {

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.pathname;

    // Set the active link
    setActiveLink(currentUrl);
  }, []);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (

    <div>
      {/* <nav class="navbar"> */}
      <nav class="navbar fixed-top navbar-dark bg-white  ">
        <div class="navbar-container container-fluid">
          <ul class="menu-items" >
            <li><a href="/viewReqForAdmin" action className={splitLocation[1] == "viewReqForAdmin" ? "text-info font-italic" : ""}>View Requisition</a></li>
            <li><a href="/adminstatic2" action className={splitLocation[1] == "adminstatic2" ? "text-info font-italic" : ""}>Add Data</a></li>
          </ul>

          <ul class="menu-items">
            <li><ModalWithCSS /></li>
          </ul>

          <img src={tCogLogoImg} alt="tCogLogo" style={{ height: '50px', width: '200px' }} />
        </div>
      </nav>
    </div>

  )
}

export default AdminHeader5;

