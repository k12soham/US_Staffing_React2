
import './App.css';
import Login1 from './ViewComponent1/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDash1 from './ViewComponent1/AdminDashboard1';
import AddClosure1 from './ViewComponent1/AddClosure1';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import CalenderApp2 from './ExtraComponent/CalenderApp2';
import ShowCompo from './utilities/ShowComponentOnClick';
import ViewClosure1 from './ViewComponent1/ViewClosure1';
import SignUp from './ViewComponent1/SignUp';
// import ModalDemo from './ViewComponent1/ModalDemo';
import ModalWithCSS from './ViewComponent1/ModalWithCSS';
import UpdateProfile from './ViewComponent1/UpdateProfile';
// import DemoLifecycle from './ExtraComponent/DemoLifecycle';
import Forgetpassword from './ViewComponent1/Forgetpassword';
import Forgetpass2 from './ViewComponent1/Forgetpass2';
import Otp from './ViewComponent1/otp';
import Abc from './ViewComponent1/abc';
import CompareNumbers from './ExtraComponent/CompareNumbers';
import ExportToExcel2 from './ExtraComponent/ExportToExcel2';
import ExportToExcel from './ExtraComponent/PdfDemo1';
import GeneratePDF from './ViewComponent1/GeneratePDF';


function App() {
  return (

    <div className="container-fluid">
      <Router>
  

        <ToastContainer/>
        <Routes>
        
          
          {/* -------------------- Login Page URL --------------------------- */}
          <Route path="/" element={<Login1 />}></Route>
          <Route path="/login" element={<Login1 />} />
          <Route path="/signup" element={<SignUp />} />
          {/* --------------------- End Login Page URL ---------------------- */}  
                
          <Route path="/admin_dashboard1" element={<AdminDash1/>} />

          {/* --------------------- EmpTeam Page URL ------------------------- */}
          <Route path="/add_closure1" element={<AddClosure1 />}></Route>
          {/* -------------------- End EmpTeam Page URL ---------------------- */}

          {/* -----------------------------Extra url --------------------------------- */}
          <Route path="/date2" element={<CalenderApp2/>}></Route>
          <Route path="/show_compo" element={<ShowCompo/>}></Route>
          <Route path="/view_closure1" element={<ViewClosure1 />}></Route>

          {/* <Route path="/modal_demo" element={<ModalDemo />}></Route> */}
          <Route path="/modal_with_css" element={<ModalWithCSS />}></Route>

          <Route path="/update_profile" element={<UpdateProfile />}></Route>
          <Route path="/forgetpass2" element={<Forgetpass2 />}></Route>
          <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
          <Route path="/otp" element={<Otp />}></Route>
          <Route path="/abc" element={< Abc/>}></Route>

          <Route path="/compare_num" element={< CompareNumbers/>}></Route>
          <Route path="/generatepdf" element={< GeneratePDF/>}></Route>
          {/* <Route path="/forgot_pass1" element={<Forgetpassword />}></Route> */}
          <Route path="/export_excel2" element={<ExportToExcel2 />}></Route>
          <Route path="/export_to" element={<ExportToExcel />}></Route>

        </Routes>
      </Router>
    </div >

  );
}

export default App;
