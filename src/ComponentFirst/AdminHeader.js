import { React } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import ModalWithCSS from "./ModalWithCSS";
import {  useLocation } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

function AdminHeader() {

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
            <ModalWithCSS />
          </div>
        </div>
      </div>

      <div className="navbar-css-2">

        <ul className="nav nav-pills">

          <ListGroup style={{ marginTop: '-1px' }}>
            <ListGroupItem tag="a" href="/adminstatic2" action className={splitLocation[1] !== "adminstatic2" ? "list-group-item-info" : ""}>Add Data</ListGroupItem>
          </ListGroup>
          <ListGroup style={{ marginTop: '-1px' }}>
            <ListGroupItem tag="a" href="/viewReqForAdmin" action className={splitLocation[1] !== "viewReqForAdmin" ? "list-group-item-info" : ""}>View Requisition</ListGroupItem>
          </ListGroup>

        </ul>
      </div>

    </div>

  )
}

export default AdminHeader;

