import React from "react"
import { ReactDOM } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWithCSS from "./ModalWithCSS";


function EmployeeHeader() {

  const recruiterName = localStorage.getItem('recruiterName');
  const recruiterID = localStorage.getItem('recruiterID');

  console.log(recruiterID);
  console.log(recruiterName);

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
            
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/addRequisition">Add Requisition</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/addCandidate">Add Candidate</a>
          </li>
          {/* <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#a" role="button" aria-expanded="false">Dropdown</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </li> */}
          <li className="nav-item">
            <a className="nav-link" href="view_all_req">View all records</a>
          </li>
         
          
        </ul>
      </div>

    </div>


    // <div className="navbar-css-1">
    //   <nav className="navbar navbar-light">
    //     <div className="container-fluid">
    //       <div className="navbar-header">
    //         <a className="navbar-brand" href="#" style={{color:"GrayText"}}>US STAFFING APP</a>
    //       </div>
    //       <ul className="nav navbar-nav">
    //         <li className="active"><a href="#">Home</a></li>
    //         <li><a href="#">Page 1</a></li>
    //         <li><a href="#">Page 2</a></li>
    //       </ul>
    //       <ul className="nav navbar-nav navbar-right">
    //          <ModalWithCSS />
    //       </ul>
    //     </div>
    //   </nav>

    // </div>

  )
}

export default EmployeeHeader;

