import React from "react"
import { ReactDOM } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWithCSS from "./ModalWithCSS";


function AdminHeader() {

  let empName = localStorage.getItem('empName');
  let empID = localStorage.getItem('empID');

  return (
    <div>
      <div className="navbar-css-1">
        <div class="row">
          <div class="col-10">
          <lable className="navbar-brand" href="#" style={{color:"GrayText"}}>US STAFFING APP</lable>
          </div>
          <div class='col-2'>
            <ModalWithCSS />  
          </div>
        </div>
      </div>

      <div className="navbar-css-2">
        
        <ul className="nav nav-pills">
            
          <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/adminstatic">Static data</a>
          </li>
          {/* <li className="nav-item">
            <a className="nav-link" aria-current="page" href="/addCandidate">Add Candidate</a>
          </li>
         
          <li className="nav-item">
            <a className="nav-link" href="view_all">View all records</a>
          </li> */}
          
        </ul>
      </div>

    </div>


  )
}

export default AdminHeader;

