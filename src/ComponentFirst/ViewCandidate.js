import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Button, Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { toast } from "react-toastify";
import { json, useNavigate } from "react-router-dom";
import GeneratePDF1 from "./GeneratePDF1";
import DatePicker from "react-datepicker";
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import {Modal} from 'react-bootstrap';  
import $ from 'jquery';
import GenerateExcel1 from "./GenerateExcel1";

function ViewCandidate() {
    const [candidateList, setcandidateList] = useState([]);
    const [candidateList1, setcandidateList1] = useState([]);
    const [statusList, setstatusList] = useState([]);
    const [statusList1, setstatusList1] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
    const [updatestatus, setUpdateStatus] = useState(null);
    const [currentstatus, setCurrentStatus] = useState(null);
    const [reqid, setReqid] = useState(null);
    const [category, setCategory] = useState();
    const [searchTerm, setSearchTerm] = useState("");
    const [isShownError, setIsShownError] = useState(false);
    const [isDownload, setIsDownload] = useState(true);
    const [isShown, setIsShown] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [show, setShow] = useState(false);  
  
    const modalClose = () => setShow(false);  
    const modalShow = () => setShow(true);

    let date1 = format(startDate, "dd-MMM-yyyy");
    let date2 = format(endDate, "dd-MMM-yyyy");
    localStorage.setItem("startdate", date1);
    localStorage.setItem("enddate", date2);


    let navigate = useNavigate();

   

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    useEffect(() => {
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))
        // axios.get(`${base_url}/getAllCandidate`).then(json => setcandidateList(json.data))
       

    }, []);

    let sessionreq = localStorage.getItem("requisitionID")
    let empID = localStorage.getItem("recruiterID")
    //document.getElementById('b1').disabled  = true;

    const deleteBook = (candidateID) => {

        axios.delete(`${base_url}/deleteCadByAdmin?candidate_id=${candidateID}`)
            .then(response => {

                toast.success("Record deleted successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "300px" }
                });

                axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
            },
                (error) => {
                    console.log(error);
                });
    }

    const handleChange = (e) => {

        let a = e.rrid;
        let b = e.sstt
        let c = e.currentst;

        setReqid(a)
        setUpdateStatus(b)
        setCurrentStatus(c)
    }

    const handleSubmit = (e) => {
        let a = reqid;
        let b = updatestatus;
        let c = currentstatus;

        if (c == null) {
            alert("Please select status")
        }


        else if (b == c) {
            alert("This status is already saved")
        }
        else {
            postdata(a, b);
        }
    }

    const handleSubmit2 = (e) => {

        let a = reqid;
        let b = updatestatus;
        let c = e.canid
        let d = currentstatus;

    
        if (d == null) {
            alert("Please select status")
        }
       else if (b == d) {
            alert("This status is already saved")
        }
        else {
            postdata2(a, b, c);
        }
    }

    const postdata = (a, b) => {

        axios.post(`${base_url}/update_status1?recruiter_id=${empID}&requisition_id=${a}&status=${b}`).then(

            (response) => {
                axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
                toast.success("Status update successfully!",
                    {
                        position: "top-right", autoClose: 2000,
                        style: { position: "absolute", top: "5px", width: "300px" }
                    }
                );
            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details.")
            }
        );
    }

    const postdata2 = (a, b, c) => {


        axios.post(`${base_url}/update_status2?recruiter_id=${empID}&requisition_id=${a}&candidate_id=${c}&status=${b}`).then(

            (response) => {
                axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
                toast.success("Status update successfully!",
                    {
                        position: "top-right", autoClose: 2000,
                        style: { position: "absolute", top: "5px", width: "300px" }
                    }
                );
            },
            (error) => {
                console.log(error);
                console.log("Error");
                alert("Please enter valid details.")
            }
        );
    }

    // ----------------------------------------------------------------------------------------------------------
    const onEdit = ({ candidateID }) => {

        localStorage.setItem('candidateID', candidateID);

        navigate("/updateCandidate");

        setInEditMode({
            status: true,
            rowKey: candidateID,
        })
    }

    const handleDownload1= () => {


        GeneratePDF1(statusList1);

    }

    const handleDownload2 = (evt) => {


        GenerateExcel1(statusList1);




    }




    const getnewID = (e) => {
        let candidate_id = e.canid
        let requisition_id = e.reqid;
        let recruiter_id = e.recid;
        localStorage.setItem("candidateID", candidate_id)
        localStorage.setItem("requisitionID", requisition_id)
        localStorage.setItem("recruiterID", recruiter_id)

    }

    // function Download() {


    //     return (
    //         <div className="d-inline-flex w-50" >
    //             <select name="category" onChange={(evt) => handleDownload({ DownloadOpt: evt.target.value })} className="btn btn-warning btn-sm dropdown-toggle" style={{ width: '135px' }}>
    //                 <option hidden value=""><button>Download <i className="fa fa-download"></i></button></option>
    //                 <option value="ExportToPDF">Export to pdf</option>
    //                 <option value="ExportToCSV">Export to csv</option>
    //             </select>
    //         </div>
    //     );
    // }

    function EmptyDataErrorMsg() {

        return (
            <div className="d-inline-flex w-50" >
                <h5> No data found</h5>
            </div>
        );
    }


    function Box() {
        return (
            <div className="d-inline-flex w-50" >
                <span style={{ width: "270px" }}> Start Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} style={{ width: '100' }} className="btn btn-sm btn-primary" selected={startDate} onChange={(date) => handleDateChange1({ date1: date })} />

                <span style={{ width: "270px" }}> End Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} selected={endDate} className="btn btn-sm btn-primary" onChange={(date) => handleDateChange2({ date2: date })} />
            </div>
        );
    }

    const handleCate = (evt) => {


    //  document.getElementById('b1').disabled = false;
  
        let cate = evt.newCate;
        setCategory(cate);
        localStorage.setItem("cate", cate);


        let date1 = format(startDate, "yyyy-MM-dd");
        let date2 = format(endDate, "yyyy-MM-dd");

        if (cate == 'Customize') {
            setIsShown(true);
            postGetDataBetDates(empID, date1, date2,sessionreq);
        }
        else {
            postGetDataByCate(empID, cate,sessionreq);
            setIsShown(false);
        }

    



    };


    const handleDateChange1 = (date) => {
        setIsShownError(false);
        const d1 = date.date1;
        let d2 = endDate;

        let f1 = format(d1, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setStartDate(d1);
            postGetDataBetDates(empID, f1, f2,sessionreq);
        } else {
            alert("Enter valid date");
        }
    }

    const handleDateChange2 = (date) => {
        setIsShownError(false);
        const d2 = date.date2;
        let f = empID;
        let f1 = format(startDate, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setEndDate(d2);
            postGetDataBetDates(empID, f1, f2,sessionreq);
        } else {
            alert("Enter valid date");
        }
    }
    const postGetDataBetDates = (f, f1, f2,f3) => {
        // axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}&requisition_id=${f3}`)
            .then(
                json => setstatusList1(json.data),
                setIsDownload(true),
            )
            .catch(error => {
                setIsShownError(true);
                setstatusList1([]);
                setIsDownload(false);
            })

    }

    const postGetDataByCate = (d1, d2,d3) => {

        axios.get(`${base_url}/get_cls_by_Quarterly?empid=${d1}&category=${d2}&requisition_id=${d3}`)
            .then(
                json => setstatusList1(json.data),


            )
            .catch(error => {

            })

    }

    const renderTable = () => {
      
      
       
        //const isAuthenticated = localStorage.getItem('recruiterID');
        //  localStorage.setItem('recruiterID', isAuthenticated);
        const isAuthenticated = localStorage.getItem('recruiterRole');

        return isAuthenticated == "TM" ? (


            statusList.filter((st) => {

              

                if (searchTerm === "") {
                    return st;
                }
                else if (st.status_date.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return st;
                }
                else if (st.candidate != null) {
                    if (st.candidate.candidate_name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                    if (st.candidate.visa_type.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                    if (st.candidate.rate_term.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                    if (st.requisition.client_rate.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                    if (st.candidate.phone.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                    if (st.candidate.email.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                    if (st.candidate.submitted_rate.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                }

                else if (st.candidate == null || st.candidate != null) {
                    if (st.status.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return st;
                    }
                }
            }
            ).map(st => {
                if (st.requisition.requisition_id == sessionreq
                    && st.recruiter.recruiter_id == empID && st.flag == 1 && (st.candidate == null || st.candidate.deleted == 1))
                  
                    
                    return (
                        <tr key={st.status_id}>
                            <td></td>
                            
                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            <a href="/viewAllStatus" onClick={(evt) => getnewID({
                                                reqid: st.requisition.requisition_id,
                                                recid: st.recruiter.recruiter_id
                                            })}>All Status</a>
                                        ) :
                                        (
                                            <a href="/viewAllStatus" onClick={(evt) => getnewID({
                                                canid: st.candidate.candidate_id, reqid: st.requisition.requisition_id,
                                                recid: st.recruiter.recruiter_id
                                            })}>All Status</a>
                                        )
                                }

                            </td>
                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.candidate_name

                                        )
                                }
                            </td>
                            <td>{st.status}</td>
                            <td style={{ overflow: "false" }}>{st.status_date}</td>

                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.visa_type

                                        )
                                }

                            </td>
                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.rate_term

                                        )
                                }

                            </td>
                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.requisition.client_rate

                                        )
                                }

                            </td>


                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.submitted_rate

                                        )
                                }

                            </td>

                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.phone

                                        )
                                }

                            </td>

                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.email

                                        )
                                }

                            </td>

                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.remark
                                        )
                                }

                            </td>

                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            st.candidate.reason
                                        )
                                }

                            </td>

                            <td>
                                {
                                    <select className=" drop-down-style btn btn-sm btn-secondary dropdown-toggle"
                                        style={{ width: '140px', fontFamily: 'arial', fontSize: '13px', textAlign: "left" }}
                                        name="status" id="status"

                                        onChange={(evt) => handleChange({
                                            rrid: sessionreq, sstt: evt.target.value, currentst: st.status
                                        })}>

                                        <option hidden default selected> Select Status</option>

                                        {
                                            statusFD.map((stfd) => (

                                                <option value={stfd.status_fd}>{stfd.status_fd}</option>
                                            ))
                                        }
                                    </select>
                                }
                                &nbsp;
                                {
                                    st.candidate == null ?
                                        (

                                            <button onClick={handleSubmit} class="btn btn-sm  btn-success" style={{ width: "20%" }}> <i class=" fa fa-save"></i></button>
                                        ) :
                                        (
                                            <button class="btn btn-sm  btn-success" style={{ width: "20%" }} onClick={() => handleSubmit2({ canid: st.candidate.candidate_id })}><i class=" fa fa-save"></i></button>
                                        )
                                }

                            </td>

                            <td>
                                {
                                    st.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            <>
                                                &nbsp;
                                                <button

                                                    className="btn btn-sm btn-outline-success"
                                                    onClick={() => onEdit({
                                                        candidateID: st.candidate.candidate_id
                                                    })}
                                                >
                                                    <i class="fa fa-edit"></i>
                                                </button>
                                                &nbsp;

                                                <button className="btn btn-sm btn-outline-danger"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure to delete this requirement?'))
                                                            deleteBook(st.candidate.candidate_id)
                                                    }}>
                                                    <i class="fa fa-trash"></i>
                                                </button>
                                            </>
                                        )
                                }
                            </td>
                        </tr>
                    )
            })


        ) : (
            navigate("/")

        );
    }


  

    

    return (
        <div className="">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <EmployeeHeader />
                </div>

                <div className="col-12 master_backgroung_work scroll-bar-horizontal">
                    <div className="row">
                        <div className="col-12 input-icons"
                            style={{ padding: '5px', margin: '10px' }}>
                            <i className="fa fa-search icon"></i>

                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search"
                                onChange={event => { setSearchTerm(event.target.value) }}
                                style={{ width: '500px', borderRadius: '100px', paddingLeft: '30px' }}
                            />
                            

                        </div>
                    </div>

                    <div>
                        <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Sr No.</th>
                                    <th style={{ width: '80px' }}>View All Status</th>
                                    <th style={{ width: '140px' }}>Candidate Name</th>
                                    <th style={{ width: '120px' }}>Current Status </th>
                                    <th style={{ width: '100px' }}>Date </th>
                                    <th style={{ width: '50px' }}>Visa Type</th>
                                    <th style={{ width: '20px' }}>Rate term</th>
                                    <th style={{ width: '60px' }}>Client Rate</th>
                                    <th style={{ width: '20px' }}>Submit Rate</th>
                                    <th style={{ width: '90px' }}>Phone</th>
                                    <th style={{ width: '130px' }}>Email</th>
                                    <th style={{ width: '100px' }}>Remark</th>
                                    <th style={{ width: '100px' }}>Reason</th>
                                    <th style={{ width: '230px' }}>Status </th>
                                    <th style={{ width: '90px' }}>Action</th>

                                </tr>
                            </thead>
                            <tbody>

                                {renderTable()}

                            </tbody>
                        </Table>
                        <div className="row">
                        <div className="col-5">
                          
                        </div>
                            <div className="col-7">
 

<div >  
       <Button variant="success" className="btn btn-primary btn-sm fa fa-download" style={{marginLeft:"0px"}} onClick={modalShow}>  
       &nbsp;&nbsp; Download 
      </Button>  
  <Modal  show={show} onHide={modalClose}>  
  <Modal.Header closeButton>  
    <Modal.Title>Submission Report</Modal.Title>  
    
  </Modal.Header>  
  
  <Modal.Body> 
  <select name="category1" onChange={(evt) => handleCate({ newCate: evt.target.value })} className="btn btn-success btn-sm dropdown-toggle" style={{ width: '150px' }}>
                                {
                                    
                                    <>
                                    
                                        <option hidden value="">Select Category</option>

                                        <option value="All">All Category</option>
                                        <option value="Current">Current</option>
                                        <option value="Last_Month">Last-month</option>
                                         <option value="Quarterly">Quarterly</option>
                                        <option value="Half_yearly">Half-yearly</option>
                                        <option value="Yearly">Yearly</option>
                                        <option value="Customize">Customize</option> 
                                    </>
                                    
                                }
                            </select> 

                            
<br></br><br></br>
{isShown && <Box />}
<Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px'}}>
  <th style={{width:"150px"}}>Candidate</th>
  <th style={{width:"90px"}}>Status</th>
  <th style={{width:"100px"}}>Date</th>
  <th style={{width:"70px"}}>Client Rate</th>
  <th style={{width:"20px"}}>Submit Rate</th>
    {
       
    statusList1.map((cl) =>
    {
    if (cl.requisition.requisition_id == sessionreq
        && cl.recruiter.recruiter_id == empID  && cl.status=="Submitted" && (cl.candidate == null || cl.candidate.deleted == 1))
        return (
      <>
   
      <tr > 
        <td hidden></td>
    
                    <td >
                                {
                                    cl.candidate == null ?
                                        (
                                            console.log("null")
                                        ) :
                                        (
                                            cl.candidate.candidate_name

                                        )
                                }
                            </td>

                            <td >
                        {
                            cl.candidate == null ?
                                (
                                    console.log("null")
                                ) :
                                (
                                    cl.status

                                )
                        }
                        </td>
                            
                            <td >
                        {
                            cl.candidate == null ?
                                (
                                    console.log("null")
                                ) :
                                (
                                    cl.status_date

                                )
                        }
                        </td>

                        <td >
                        {
                            cl.requisition == null ?
                                (
                                    console.log("null")
                                ) :
                                (
                                    cl.requisition.client_rate

                                )
                        }
                        </td>
                
                        <td >
                        {
                            cl.candidate == null ?
                                (
                                    console.log("null")
                                ) :
                                (
                                    cl.candidate.submitted_rate

                                )
                        }
                        </td><br></br>
                        
                        </tr>
                        </>
                                )
    }
        
    )
} 
</Table>
  </Modal.Body>  
  
  <Modal.Footer>  
    <button  id="b1" onClick={handleDownload1}  className="btn btn-primary">PDF</button>  
    <button  id="b2"  onClick={handleDownload2} className="btn btn-primary">Excel</button>  
     
  </Modal.Footer>  
</Modal>  
    </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
export default ViewCandidate;