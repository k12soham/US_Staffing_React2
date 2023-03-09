import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/3.3.7/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login1 from './ComponentFirst/LoginPage';
import ReqView from './ComponentFirst/ReqView';
import { Navbar } from 'react-bootstrap';
// import mobileScreen from './ComponentFirst/NavDemo1';
import SignUp from './ComponentFirst/SignUp';
import AddRequisition from './ComponentFirst/AddRequisition';
import AddCandidate from './ComponentFirst/AddCandidate';
import NavBarHeader from './ComponentFirst/NavbarHeader';
import EmployeeHeader from './ComponentFirst/EmployeeHeader';
import AdminStatic from './ComponentFirst/AdminStatic';
import Demo from './ComponentFirst/demo';
import UpdateReq from './ComponentFirst/UpdateReq';
import ViewAllReq from './ComponentFirst/ViewAllReq';
import UpdateCandidate from './ComponentFirst/UpdateCandidate';
import ViewReqForAdmin from './ComponentFirst/ViewReqForAdmin';
import ViewCandForAdmin from './ComponentFirst/ViewCandForAdmin';
import ViewAllStatusAdmin from './ComponentFirst/ViewAllStatusAdmin';
import "react-datepicker/dist/react-datepicker.css";
import ViewCandidate from './ComponentFirst/ViewCandidate';
import UpdateProfile from './ComponentFirst/UpdateProfile';
import UpdateProfileAdmin from './ComponentFirst/UpdateProfileAdmin';
import "react-datepicker/dist/react-datepicker.css";
import Pagination from './ComponentFirst/PaginationDemo';

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <ToastContainer />
		
        <Routes>
        <Route path="/" element={<Login1 />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/req_view2" element={<ReqView />}></Route>
        {/* <Route path="/navbar" element={<NavBar />}></Route> */}
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/addRequisition" element={<AddRequisition />}></Route>
        <Route path="/addCandidate" element={<AddCandidate />}></Route>
        <Route path="/nav_header" element={<NavBarHeader />}></Route>
        <Route path="/adminstatic" element={<AdminStatic />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
        {/* <Route path="/nav_header" element={<EmployeeHeader />}></Route> */}
        {/* <Route path="/view_all" element={<ViewAllRecords />}></Route>
        <Route path="/view_all2" element={<ViewAllRecords2 />}></Route> */}
        {/* <Route path="/update_profile" element={<UpdateProfile />}></Route> */}
        <Route path="/viewCandidate" element={<ViewCandidate />}></Route>
        <Route path="/view_all_req" element={<ViewAllReq />}></Route>

        <Route path="/updateRequisition" element={<UpdateReq />}></Route>
        <Route path="/updateCandidate" element={<UpdateCandidate />}></Route>

        <Route path="/viewReqForAdmin" element={<ViewReqForAdmin />}></Route>
        <Route path="/viewCandForAdmin" element={<ViewCandForAdmin />}></Route>
        <Route path="/viewAllStatusAdmin" element={<ViewAllStatusAdmin />}></Route>
        
        <Route path="/update_profile" element={<UpdateProfile/>}></Route>
        <Route path="/update_profile_Admin" element={<UpdateProfileAdmin/>}></Route>
        <Route path="/pagination" element={<Pagination/>}></Route>
        {/* <Route path="/paginatedItems" element={ <PaginatedItems/>}></Route> */}
       
        {/* <Route path="/navdemo1" element={<mobileScreen />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
