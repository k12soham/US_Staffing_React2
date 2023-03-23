import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login1 from './ComponentFirst/LoginPage';
import SignUp from './ComponentFirst/SignUp';
import AddRequisition from './ComponentFirst/AddRequisition';
import AddCandidate from './ComponentFirst/AddCandidate';
import AdminStatic from './ComponentFirst/AdminStatic';
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
import Pageexample from './ComponentFirst/Pageexample';
import ViewAllStatus from './ComponentFirst/ViewAllStatus';
import Pagination from './ComponentFirst/PaginationDemo';
import AdminStatic2 from './ComponentFirst/AdminStatic2';

function App() {

  let a= localStorage.getItem("recruiterIDAdmin")
  return (
    <div className="container-fluid">
      <Router>
        <ToastContainer />
		
        <Routes>
        <Route path="/" element={<Login1 />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/addRequisition" element={<AddRequisition />}></Route>

        <Route path="/adminstatic" element={<AdminStatic />}></Route>
        <Route path="/addCandidate" element={<AddCandidate />}></Route>

        
        <Route path="/viewCandidate" element={<ViewCandidate />}></Route>
        <Route path="/view_all_req" element={<ViewAllReq />}></Route>


        <Route path="/updateRequisition" element={<UpdateReq />}></Route>
        <Route path="/updateCandidate" element={<UpdateCandidate />}></Route>

        <Route path="/viewReqForAdmin" element={<ViewReqForAdmin />}></Route>
        <Route path="/viewCandForAdmin" element={<ViewCandForAdmin />}></Route>
        <Route path="/viewAllStatusAdmin" element={<ViewAllStatusAdmin />}></Route>
        <Route path="/viewAllStatus" element={<ViewAllStatus />}></Route>
        
        <Route path="/update_profile" element={<UpdateProfile/>}></Route>
        <Route path="/update_profile_Admin" element={<UpdateProfileAdmin/>}></Route>

        <Route path="/page" element={<Pageexample/>}></Route>
        <Route path="/pagination" element={<Pagination/>}></Route>

        <Route path="/adminstatic2" element={<AdminStatic2/>}></Route>
       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
