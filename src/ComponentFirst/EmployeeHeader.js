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
      <nav class="navbar">
        <div class="navbar-container container">
          <ul class="menu-items">
            <li><a href="/addRequisition" action className={splitLocation[1] == "addRequisition" ? "list-group-item-info" : ""}>Add Requisition</a></li>
            <li><a href="/addCandidate" action className={splitLocation[1] == "addCandidate" ? "list-group-item-info" : ""}>Submit Candidate</a></li>
            <li><a href="/view_all_req" action className={splitLocation[1] == "view_all_req" ? "list-group-item-info" : ""}>View Requisition</a></li>
          
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

