import React from "react"
import { ReactDOM } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWithCSS from "./ModalWithCSS";
import {ListGroup, ListGroupItem} from "reactstrap";
import { useLocation } from "react-router-dom";



function EmployeeHeader() {

  const recruiterName = localStorage.getItem('recruiterName');
  const recruiterID = localStorage.getItem('recruiterID');

  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

  // console.log(recruiterID);
  // console.log(recruiterName);

  return (
    <div>
      <div className="navbar-css-1">
        <div class="row">
          <div class="col-11">
            <lable className="navbar-brand" href="#" style={{ color: "GrayText" }}>US STAFFING APP</lable>
          </div>
          <div class='col-1'>
            <ModalWithCSS />
          </div>
        </div>
      </div>

      <div className="navbar-css-2">

        {/* <ul className="nav nav-pills">
            
        {/*  <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/addRequisition">Add Requisition</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/addCandidate">Submit Candidate</a>
          </li>          
          <li className="nav-item">
            <a className="nav-link" href="view_all_req">View all records</a>
          </li>         
          
        </ul> */}
        <ul className="nav nav-pills">

        <ListGroup style={{ marginTop: '-3px' }}>
          <ListGroupItem tag="a" href="/addRequisition" action className={splitLocation[1] !== "addRequisition" ? "list-group-item-info" : ""}>Add Requirements</ListGroupItem>
        </ListGroup>
        <ListGroup style={{ marginTop: '-3px' }}>
          <ListGroupItem tag="a" href="/addCandidate" action className={splitLocation[1] !== "addCandidate" ? "list-group-item-info" : ""}>Add Candidate</ListGroupItem>
        </ListGroup>
        <ListGroup style={{ marginTop: '-3px' }}>
          <ListGroupItem tag="a" href="/view_all_req" action className={splitLocation[1] !== "view_all_req" ? "list-group-item-info" : ""}>View Requirements</ListGroupItem>
        </ListGroup>
        </ul>
      </div>

    </div>


  )
}

export default EmployeeHeader;

