import { React, useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
// import ModalWithCSS from "./ComponentFirst/ModalWithCSS";
import { useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import tCogLogoImg from "../Images/tCogLogo.png"
import { NavLink } from 'react-router-dom';
import ModalWithCSS from "./ModalWithCSS";

function AdminHeader5() {

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Get the current URL
    const currentUrl = window.location.pathname;

    // Set the active link
    setActiveLink(currentUrl);
  }, []);

  console.log("current path: "+activeLink);

  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (

    <div>
      <nav class="navbar">
        <div class="navbar-container container">
        <ul class="menu-items">
            <li><a  href="/adminstatic2" action className={splitLocation[1] == "adminstatic2" ? "list-group-item-info" : ""}>Add Data</a></li> 
             <li><a href="/viewReqForAdmin" action className={splitLocation[1] == "viewReqForAdmin" ? "list-group-item-info" : ""}>View Requisition</a></li>
         </ul>
         <ul class="menu-items">
            <li></li> 
             <li></li>
         </ul>
         
          <ul class="menu-items">
            <li></li> 
             <li></li>
         </ul>
             <ul class="menu-items">
         <li><ModalWithCSS/></li>
          </ul>
        
        
          <h6 class="logo"><img src={tCogLogoImg} alt="tCogLogo" style={{ height: '50px', width: '150px' }} /></h6>
        </div>
      </nav>
    </div>

  )
}

export default AdminHeader5;

