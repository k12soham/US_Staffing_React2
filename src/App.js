import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login1 from './ComponentFirst/LoginPage';
import SignUp from './ComponentFirst/SignUp';
import AddRequisition from './ComponentFirst/AddRequisition';
import AddCandidate from './ComponentFirst/AddCandidate';
import UpdateReq from './ComponentFirst/UpdateReq';
import ViewAllReq from './ComponentFirst/ViewAllReq';
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
import UpdateCandidateAdmin from './ComponentFirst/UpdateCandidateAdmin';
import UpdateReqAdmin from './ComponentFirst/UpdateReqAdmin';
import Changepassword from './ComponentFirst/Changepassword';
import ModalWithCSS from './ComponentFirst/ModalWithCSS';
import UpdateCand2 from './ComponentFirst/UpdateCand2';


function App() {

  let a= localStorage.getItem("recruiterIDAdmin")
  return (
    <div className="">
      <Router>
        <ToastContainer />
		
        <Routes>
        <Route path="/" element={<Login1 />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/addRequisition" element={<AddRequisition />}></Route>

        <Route path="/addCandidate" element={<AddCandidate />}></Route>
        <Route path="/adminstatic2" element={<AdminStatic2/>}></Route>
        
        <Route path="/viewCandidate" element={<ViewCandidate />}></Route>
        <Route path="/view_all_req" element={<ViewAllReq />}></Route>

        <Route path="/updateRequisition" element={<UpdateReq />}></Route>
        <Route path="/updateCandidate" element={<UpdateCand2 />}></Route>

        <Route path="/updateRequisitionAdmin" element={<UpdateReqAdmin />}></Route>
        <Route path="/updateCandidateAdmin" element={<UpdateCandidateAdmin />}></Route>

        <Route path="/viewReqForAdmin" element={<ViewReqForAdmin />}></Route>
        <Route path="/viewCandForAdmin" element={<ViewCandForAdmin />}></Route>
        <Route path="/viewAllStatusAdmin" element={<ViewAllStatusAdmin />}></Route>
        <Route path="/viewAllStatus" element={<ViewAllStatus />}></Route>
        
        <Route path="/update_profile" element={<UpdateProfile/>}></Route>
        <Route path="/change_password_recruiter" element={<UpdateProfileAdmin/>}></Route>

        <Route path="/change_password" element={<Changepassword/>}></Route>

        <Route path="/page" element={<Pageexample/>}></Route>
        <Route path="/pagination" element={<Pagination/>}></Route>
  
        <Route path="/modal" element={<ModalWithCSS/>}></Route>      
        </Routes>
      </Router>
    </div>
  );
}

export default App;
