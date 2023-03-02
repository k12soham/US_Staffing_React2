import { React, useState } from "react"
import { ReactDOM } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWithCSS from "./ModalWithCSS";
import { Link, useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

function AdminHeader() {

  let empName = localStorage.getItem('empName');
  let empID = localStorage.getItem('empID');

  const location = useLocation();
  //destructuring pathname from location
  const { pathname } = location;

  //Javascript split method to get the name of the path in array
  const splitLocation = pathname.split("/");

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

        <ul className="nav nav-pills">

          {/* <li className="nav-item" style={{ padding: "10px" }}>
         
              <a className={splitLocation[1] === "adminstatic" ? "list-group-item-info" : ""} href="adminstatic">Static Data</a>
         
          </li>

          <li className="nav-item" style={{ padding: "10px" }}>
            <a className={splitLocation[1] === "viewReqForAdmin" ? "list-group-item-info" : ""} href="viewReqForAdmin">View Requisition</a>
          </li>
           */}

          <ListGroup style={{ marginTop: '-3px' }}>
            <ListGroupItem tag="a" href="/adminstatic" action className={splitLocation[1] !== "adminstatic" ? "list-group-item-info" : ""}>Add Data</ListGroupItem>
          </ListGroup>
          <ListGroup style={{ marginTop: '-3px' }}>
            <ListGroupItem tag="a" href="/viewReqForAdmin" action className={splitLocation[1] !== "viewReqForAdmin" ? "list-group-item-info" : ""}>View Requirements</ListGroupItem>
          </ListGroup>

        </ul>
      </div>

    </div>

  )
}

export default AdminHeader;

