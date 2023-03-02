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
    
  const { pathname } = location;

  const splitLocation = pathname.split("/");



  return (
    <div>
      <div className="navbar-css-1">
        <div class="row">
          <div class="col-11">
          <lable className="navbar-brand" href="#" style={{color:"GrayText"}}>US STAFFING APP</lable>
          </div>
          <div class='col-1'>
            <ModalWithCSS />  
          </div>
        </div>
      </div>

      <div className="navbar-css-2">
        
        <ul className="nav nav-pills">
            
        {/*  <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/addRequisition">Add Requisition</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/addCandidate">Submit Candidate</a>
          </li>
           <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#a" role="button" aria-expanded="false">Dropdown</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </li> 
          <li className="nav-item">
            <a className="nav-link" href="view_all_req">View all records</a>
      </li>*/}
         

          <ListGroup style={{marginTop:'-5px'}}>            
            <ListGroupItem tag="a" href="/addRequisition" action  className={splitLocation[1] === "addRequisition" ? "list-group-item-info" : ""}>Add Requisition</ListGroupItem>
            </ListGroup>
            <ListGroup style={{marginTop:'-5px'}}> 
            <ListGroupItem tag="a" href="/addCandidate" action className={splitLocation[1] === "addCandidate" ? "list-group-item-info" : ""}>Add Candidate</ListGroupItem>
            </ListGroup>
            <ListGroup style={{marginTop:'-5px'}}> 
            <ListGroupItem tag="a" href="/view_all_req" action className={splitLocation[1] === "view_all_req" ? "list-group-item-info" : ""}>View All Requisition</ListGroupItem>
            </ListGroup>

          
        </ul>
      </div>

    </div>


  )
}

export default EmployeeHeader;

