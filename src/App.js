import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Login1 from './ComponentFirst/LoginPage';
import ReqView from './ComponentFirst/ReqView';
import { Navbar } from 'react-bootstrap';
import NavBar from './ComponentFirst/NavBar';
// import mobileScreen from './ComponentFirst/NavDemo1';
import SignUp from './ComponentFirst/SignUp';
import AddRequisition from './ComponentFirst/AddRequisition';
import AddCandidate from './ComponentFirst/AddCandidate';
import NavBarHeader from './ComponentFirst/NavbarHeader';
import EmployeeHeader from './ComponentFirst/EmployeeHeader';
import AdminStatic from './ComponentFirst/AdminStatic';
import Demo from './ComponentFirst/demo';
import ViewAllRecords from './ComponentFirst/ViewAllRecords';

function App() {
  return (
    <div className="container-fluid">
      <Router>
        <ToastContainer />
		
        <Routes>
        <Route path="/" element={<Login1 />}></Route>
        <Route path="/req_view2" element={<ReqView />}></Route>
        {/* <Route path="/navbar" element={<NavBar />}></Route> */}
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/addRequisition" element={<AddRequisition />}></Route>
        <Route path="/addCandidate" element={<AddCandidate />}></Route>
        <Route path="/nav_header" element={<NavBarHeader />}></Route>
        <Route path="/adminstatic" element={<AdminStatic />}></Route>
        <Route path="/demo" element={<Demo />}></Route>
        {/* <Route path="/nav_header" element={<EmployeeHeader />}></Route> */}
        <Route path="/view_all" element={<ViewAllRecords />}></Route>
        {/* <Route path="/navdemo1" element={<mobileScreen />}></Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
