import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Button,Table } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import history from './ResponseVal';
import AdminHeader5 from "./AdminHeader5";
import {Modal} from 'react-bootstrap';
import GeneratePDF2 from "./GeneratePDF2";
import GenerateExcel2 from "./GenerateExcel2";
import DatePicker from "react-datepicker";
import { format } from 'date-fns'
function ViewReqForAdmin() {


    const [requisitionList, setRequisitionList] = useState([]);
    const [statusList, setstatusList] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusList1, setstatusList1] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isShown, setIsShown] = useState(false);
    const [show, setShow] = useState(false);  
    const [isDownload, setIsDownload] = useState(true);
    const [category, setCategory] = useState();
    const [recruiter, setRecruiter] = useState([]);
    const [rec, setRec] = useState();
    const modalClose = () => setShow(false);  
    const modalShow = () => setShow(true);
    let navigate = useNavigate();

    let date1 = format(startDate, "dd-MMM-yyyy");
    let date2 = format(endDate, "dd-MMM-yyyy");
    localStorage.setItem("startdate", date1);
    localStorage.setItem("enddate", date2);

    // ---------------------------Pagination-------------------------------------------------------------
    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))
        axios.get(`${base_url}/getAllRcruiter2`).then(json => setRecruiter(json.data))

    }, []);

    const deleteBook = (requisitionID) => {
        console.log(requisitionID);
        axios.delete(`${base_url}/deleteRequisitionByAdmin?requisition_id=${requisitionID}`)
            .then(response => {

                toast.success("Record deleted successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "300px" }
                });

                axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
            },
                (error) => {
                    console.log(error);
                });
    }

    const onEdit = ({ requisitionID }) => {

        localStorage.setItem('requisitionID', requisitionID);

        navigate("/updateRequisitionAdmin");

    }
    function Box() {
        return (
            <div className="d-inline-flex w-100" >
                <span style={{ width: "250px" }}> Start Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} style={{ width: '100' }} className="btn btn-sm btn-primary" selected={startDate} onChange={(date) => handleDateChange1({ date1: date })} />

                <span style={{ width: "250px" }}> End Date:</span>
                <DatePicker dateFormat="dd-MMM-yyyy" maxDate={new Date()} selected={endDate} className="btn btn-sm btn-primary" onChange={(date) => handleDateChange2({ date2: date })} />
            </div>
        );
    }
    const handleDateChange1 = (date) => {
     
        const d1 = date.date1;
        let d2 = endDate;

        let f1 = format(d1, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setStartDate(d1);
            postGetDataBetDates(f1, f2);
        } else {
            alert("Enter valid date");
        }
    }

    const handleDateChange2 = (date) => {
      
        const d2 = date.date2;
    
        let f1 = format(startDate, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setEndDate(d2);
            postGetDataBetDates(f1, f2);
        } else {
            alert("Enter valid date");
        }
    }
    const postGetDataBetDates = (f1, f2,f3) => {
        // axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/get_cls_byDateAdmin?date1=${f1}&date2=${f2}`)
            .then(
                json => setstatusList1(json.data),
                setIsDownload(true),
            )
            .catch(error => {
                
                setstatusList1([]);
                setIsDownload(false);
            })

    }


    const handleDownload1= () => {

        if(category==null || rec==null)
        {
            alert("Please select Category & Recruiter")
        }
        else{
            GeneratePDF2(statusList1);
        }
               
        
            }
        
            const handleDownload2 = (evt) => {
        
                if(category==null || rec==null)
                {
                    alert("Please select Category & Recruiter")
                }
                else{
                    GenerateExcel2(statusList1);
                }
              
            }
            const handleCate = (evt) => {


                //  document.getElementById('b1').disabled = false;
              
                    let cate = evt.newCate;
                    setCategory(cate);
                    localStorage.setItem("cate", cate);
                    if (cate == 'Customize') {
                        setIsShown(true);
                        postGetDataBetDates( date1, date2);
                    }
                    else {
                
                        postGetDataByCate(cate);
                        setIsShown(false);
                    }
            
            
                };

                const handleCate2 =(evt)=>
                {
                    setRec(evt.rec)
                 
                 localStorage.setItem("rec",evt.rec)
                }



                const postGetDataByCate = ( d2) => {

                    axios.get(`${base_url}/get_cls_by_QuarterlyAdmin2?category=${d2}`)
                        .then(
                            json => setstatusList1(json.data),
            
            
                        )
                        .catch(error => {
            
                        })
            
                }

    const getnewID = (e) => {

        let requisitionID = e.rq
        let req = e.req
        localStorage.setItem("requisitionID", requisitionID)
        localStorage.setItem("reqID", req)

    }

    const renderTable = () => {
        const isAuthenticated = localStorage.getItem('recruiterRole');


        return isAuthenticated == "Admin" ? (


            requisitionList.filter((cls) => {

                if (searchTerm === "") {
                    return cls;
                }
                else if (cls.requisition_from.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.client.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.job_title.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                } else if (cls.duration.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.client_rate.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.location.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                } else if (cls.position_type.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.skills.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                }
                else if (cls.id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                }


            }
            ).map(cls => {
                if (cls.deleted == 1) {
                    return (
                        <tr key={cls.requisition_id}>
                            <td></td>
                            <td hidden>{cls.requisition_id}</td>
                            <td>{cls.requisition_from}</td>

                            <td>{
                                <a href="/viewCandForAdmin" onClick={(evt) => getnewID({ rq: cls.requisition_id, req: cls.id })}>{cls.id}</a>

                            }</td>
                            <td>{cls.client}</td>
                            <td>{cls.job_title}</td>
                            <td>{cls.duration}</td>
                            <td>{cls.client_rate}</td>
                            <td>{cls.location}</td>
                            <td>{cls.position_type}</td>
                            <td>{cls.skills}</td>
                            <td>
                                &nbsp;&nbsp;
                                <button
                                    style={{ marginRight: '3px' }}
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => onEdit({
                                        requisitionID: cls.requisition_id,
                                    })}
                                >
                                    <i class="fa fa-edit"></i>
                                </button>
                                &nbsp;&nbsp;

                                <button className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                        if (window.confirm('Are you sure to delete this requirement?'))
                                            deleteBook(cls.requisition_id)
                                    }}>
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr >

                    )
                }

            })
        ) : (
            history.push("/"),
            window.location.reload()
        );

    }

    return (
        // return (
        <div >
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <AdminHeader5 />
                </div>
                <div className="col-12">

                    {/* --------------------------Search Bar------------------------------ */}
                    <div className="row">
                    <div class="col-md-6 block1">
                        <div className="input-icons"
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
                        <div class="col-md-6 block2" style={{ textAlign: 'right' }}>
                        <div style={{ paddingTop: '4px', margin: '8px' }}>
                            <button id="btn1" onClick={modalShow} className="btn btn-outline-info w-10">
                                <i className="fa fa-download"></i>
                                &nbsp; Report
                            </button>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="col-12 master_backgroung_work scroll-bar-horizontal" >

                    <div>

                        <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Sr No.</th>
                                    <th style={{ width: '120px' }}>Requisition From</th>
                                    <th style={{ width: '90px' }}>Job Posting ID</th>
                                    <th style={{ width: '100px' }}>Client</th>
                                    <th style={{ width: '130px' }}>Job Title</th>
                                    <th style={{ width: '70px' }}>Duration</th>
                                    <th style={{ width: '50px' }}>Client Rate</th>
                                    <th style={{ width: '80px' }}>Location</th>
                                    <th style={{ width: '90px' }}>Position Type</th>
                                    <th style={{ width: '100px' }}>Skills</th>
                                    <th style={{ width: '70px' }}>Action</th>

                                </tr>
                            </thead>
                            <tbody>

                                {renderTable()}

                            </tbody>
                        </Table>
                        <div className="row">
                        <div className="col-6">
                          
                        </div>
                            <div className="col-6">
 

<div >  
       
  <Modal  show={show} onHide={modalClose} size="lg">  
  <Modal.Header  closeButton>  
    <Modal.Title  className="ms-auto">Submission Report</Modal.Title>  
    
  </Modal.Header>  
  
  <Modal.Body> 
  <select name="category1"  value={category} onChange={(evt) => handleCate({ newCate: evt.target.value })} className="btn btn-success btn-sm dropdown-toggle" style={{ width: '150px', marginLeft:'200px',textAlign:"left" }}>
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

                            
<select name="recruiter" value={rec} onChange={(evt) => handleCate2({ rec: evt.target.value  })} className="btn btn-success btn-sm dropdown-toggle" style={{ width: '150px', marginLeft:'50px',textAlign:"left" }}>
                                {
                                    
                                    <>
                                    
                                        <option hidden value="">Select Recruiter</option>
                                        <option value="all">All Recruiter</option>

                                        {
                                            recruiter.map(rec=>
                                               
                                                <option value={rec.recruiter_id}>{rec.recruiter_name}</option>
                                                
                                            
                                                )
                                        }

                                       
                                    </>
                                    
                                }
                            </select> <br></br><br></br>

{isShown && <Box />}
<Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px'}}>
<th style={{width:"120px"}}>Job Positing ID</th>
<th style={{width:"150px"}}>Recruiter Name</th>
  <th style={{width:"160px"}}>Candidate Name</th>
  <th style={{width:"90px"}}>Status</th>
  <th style={{width:"100px"}}>Date</th>
  <th style={{width:"70px"}}>Client Rate</th>
  <th style={{width:"70px"}}>Submitted Rate</th>
    {
       
    statusList1.map((cl) =>
    {
       
    if (
           cl.status=="Submitted" && (cl.candidate == null || cl.candidate.deleted == 1)&&(cl.recruiter.recruiter_id==rec||rec=='all'))

        
        return (
      <>
   
      <tr > 
        <td hidden></td>
        <td >{cl.requisition.id}  </td>
               
        <td >
                                {
                                    cl.recruiter == null ?
                                        (
                                           {}
                                        ) :
                                        (
                                            cl.recruiter.recruiter_name

                                        )
                                }
                            </td>
                    <td >
                                {
                                    cl.candidate == null ?
                                        (
                                            {}
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
                                    {}
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
                                    {}
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
                                    {}
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
                                    {}
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
  
  <Modal.Footer >  
    <button  onClick={handleDownload1}  className="btn btn-primary">PDF</button>  
    <button  onClick={handleDownload2} className="btn btn-primary">Excel</button>  
     
  </Modal.Footer>  
</Modal>  
    </div>  
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* // ********************************************** add script code**************************** */}

            <div className="application">

                {/* <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <link rel="canonical" href="http://example.com/example" />
                    <script src="/path/to/resource.js" type="text/javascript" />
                    <script>alert('Hello world')</script>

                    <script>
                        $(function () {
                            $("#example1").DataTable({
                                "responsive": true, "lengthChange": false, "autoWidth": false,
                                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
                        $('#example2').DataTable({
                            "paging": true,
                        "lengthChange": false,
                        "searching": false,
                        "ordering": true,
                        "info": true,
                        "autoWidth": false,
                        "responsive": true,
    });
  });
                    </script> 
                </Helmet>*/}
            </div>
        </div>


        //)


    );

}
export default ViewReqForAdmin;