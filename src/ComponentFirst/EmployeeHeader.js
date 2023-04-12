import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWithCSS from "./ModalWithCSS";
import {ListGroup, ListGroupItem} from "reactstrap";
import { useLocation } from "react-router-dom";

function EmployeeHeader() {

  const location = useLocation();
  const { pathname } = location;

  const splitLocation = pathname.split("/");

 

  return (
    <div>
      <div className="navbar-css-1">
        <div class="row">
          <div class="col-10">
            <lable className="navbar-brand" href="#" style={{ color: "GrayText" }}>US STAFFING APP</lable>
          </div>
          <div class='col-2' style={{alignItems:"end" }}>
            <ModalWithCSS/>
          </div>
        </div>
      </div>

      <div className="navbar-css-2">
        <ul className="nav nav-pills">

        <ListGroup style={{ marginTop: '-3px' }}>
          <ListGroupItem tag="a" href="/addRequisition" action className={splitLocation[1] !== "addRequisition" ? "list-group-item-info" : ""}>Add Requisition</ListGroupItem>
        </ListGroup>
        <ListGroup style={{ marginTop: '-3px' }}>
          <ListGroupItem tag="a" href="/addCandidate" action className={splitLocation[1] !== "addCandidate" ? "list-group-item-info" : ""}>Submit Candidate</ListGroupItem>
        </ListGroup>
        <ListGroup style={{ marginTop: '-3px' }}>
          <ListGroupItem tag="a" href="/view_all_req" action className={splitLocation[1] !== "view_all_req" ? "list-group-item-info" : ""}>View Requisition</ListGroupItem>
        </ListGroup>
        </ul>
      </div>

    </div>


  )
}

export default EmployeeHeader;

