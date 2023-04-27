import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWithCSS from "./ModalWithCSS";
import {ListGroup, ListGroupItem} from "reactstrap";
import { useLocation } from "react-router-dom";
import tCogLogoImg from "../Images/tCogLogo.png"

function EmployeeHeader() {

  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/"); 

  return (

    <div>
      <nav class="navbar fixed-top navbar-dark bg-white  ">
        <div class="navbar-container ">
          <ul class="menu-items">
            <li><a href="/addRequisition" action className={splitLocation[1] == "addRequisition" ? "text-info font-italic" : ""}>Add Requisition</a></li>
            <li><a href="/addCandidate" action className={splitLocation[1] == "addCandidate" ? "text-info font-italic" : ""}>Submit Candidate</a></li>
            <li><a href="/view_all_req" action className={splitLocation[1] == "view_all_req" ? "text-info font-italic" : ""}>View Requisition</a></li>
          
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

export default EmployeeHeader;

