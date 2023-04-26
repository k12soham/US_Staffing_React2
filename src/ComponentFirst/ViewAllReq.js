import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Button, Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import ReactPaginate from 'react-paginate';
import history from './ResponseVal';
import GeneratePDF1 from "./GeneratePDF1";
import { Modal } from 'react-bootstrap';
import { format } from 'date-fns'
import DatePicker from "react-datepicker";
import GenerateExcel1 from "./GenerateExcel1";
function ViewAllReq() {

    const recruiterID = localStorage.getItem('recruiterID');

    const [requisitionList, setRequisitionList] = useState([]);
    const [statusList, setstatusList] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
    const [candidateList1, setcandidateList1] = useState([])
    const [statusList1, setstatusList1] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState();
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

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });
    let navigate = useNavigate();

    let empID = localStorage.getItem("recruiterID");


    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    // ----------------------------------------------------------------------------------------------------------
    const onEdit = ({ requisitionID }) => {

        console.log(requisitionID);
        localStorage.setItem('recruiterID', recruiterID);
        localStorage.setItem('requisitionID', requisitionID);

        navigate("/updateRequisition");

        setInEditMode({
            status: true,
            rowKey: requisitionID,
        })
    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    const getnewID = (e) => {
        let rq = e.rq
        let req = e.req
        localStorage.setItem("requisitionID", rq)
        localStorage.setItem("reqID", req)

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
            postGetDataBetDates(empID, date1, date2);
        }
        else {
            postGetDataByCate(empID, cate);
            setIsShown(false);
        }

    };

    const handleDateChange1 = (date) => {

        const d1 = date.date1;
        let d2 = endDate;

        let f1 = format(d1, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setStartDate(d1);
            postGetDataBetDates(empID, f1, f2);
        } else {
            alert("Enter valid date");
        }
    }

    const handleDateChange2 = (date) => {

        const d2 = date.date2;
        let f = empID;
        let f1 = format(startDate, 'yyyy-MM-dd');
        let f2 = format(d2, 'yyyy-MM-dd');

        if (f2 >= f1) {
            setEndDate(d2);
            postGetDataBetDates(empID, f1, f2);
        } else {
            alert("Enter valid date");
        }
    }
    const postGetDataBetDates = (f, f1, f2) => {
        // axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`)
            .then(
                json => setstatusList1(json.data),
                setIsDownload(true),
            )
            .catch(error => {

                setstatusList1([]);
                setIsDownload(false);
            })
    }

    const postGetDataByCate = (d1, d2) => {

        axios.get(`${base_url}/get_cls_by_Quarterly?empid=${d1}&category=${d2}`)
            .then(
                json => setstatusList1(json.data),
            )
            .catch(error => {

            })
    }

    const handleDownload1 = () => {

        if (category == null) {
            alert("Please select category")
        }
        else {
            GeneratePDF1(statusList1);
        }
    }

    const handleDownload2 = (evt) => {

        if (category == null) {
            alert("Please select category")
        }
        else {
            GenerateExcel1(statusList1);
        }
    }

    const renderTable = () => {

        return (

            statusList.filter((cls) => {

                if (searchTerm === "") {
                    return cls;
                }
                else if (cls.requisition.requisition_from.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.requisition.client.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.requisition.job_title.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                } else if (cls.requisition.duration.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.requisition.client_rate.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.requisition.location.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                } else if (cls.requisition.position_type.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.requisition.skills.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                }
                else if (cls.requisition.id.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
            }
            ).map(cls => {

                if (cls.recruiter.recruiter_id == empID && cls.requisitionflag == 1 && cls.requisition.deleted == 1)

                    return (

                        <tr key={cls.requisition.requisition_id}>
                            <td></td>
                            <td hidden>{cls.requisition.requisition_id}</td>
                            <td>{cls.requisition.requisition_from}</td>
                            <td>{<a href="/viewCandidate" onClick={(evt) => getnewID({ rq: cls.requisition.requisition_id, req: cls.requisition.id })}>{cls.requisition.id}</a>}</td>
                            <td>{cls.requisition.client}</td>
                            <td>{cls.requisition.job_title}</td>
                            <td>{cls.requisition.duration}</td>
                            <td>{cls.requisition.client_rate}</td>
                            <td>{cls.requisition.location}</td>
                            <td>{cls.requisition.position_type}</td>
                            <td>{cls.requisition.skills}</td>

                            <td>

                                <button
                                    className="btn btn-sm btn-outline-success"
                                    style={{ marginLeft: "5px" }}
                                    onClick={() => onEdit({

                                        requisitionID: cls.requisition.requisition_id,

                                    })}
                                >
                                    <i class="fa fa-edit"></i>

                                </button>

                            </td>
                        </tr>
                    )
            }))
    }
    const isAuthenticated = localStorage.getItem('recruiterRole');

    return isAuthenticated == "TM" ? (
        <div className="row">
            <div className="col-12">
                <EmployeeHeader />
            </div>

            {/* ---------------------new ui code------------------------- */}

            <div className="col-12 pt-5 mt-5">
                <div class="row">
                    <div class="col-md-6 block1">

                        <div className="input-icons" style={{ paddingTop: '4px', margin: '8px' }}>
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
                    {/* --------- Report Button ------------------------------------------------------*/}
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

            <div className="col-12 mt-1">
                <div>
                    <Table bordered className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px', textOverflow: "ellipsis" }}>
                        <thead>
                            <tr>
                                <th style={{ width: '20px' }}>Sr No.</th>
                                <th style={{ width: '140px' }}>Requisition From</th>
                                <th style={{ width: '100px' }}>Job Posting ID</th>
                                <th style={{ width: '170px' }}>Client</th>
                                <th style={{ width: '150px' }}>Job Title</th>
                                <th style={{ width: '50px' }}>Duration</th>
                                <th style={{ width: '30px' }}>Client Rate</th>
                                <th style={{ width: '100px' }}>Location</th>
                                <th style={{ width: '70px' }}>Position Type</th>
                                <th style={{ width: '100px' }}>Skills</th>
                                <th style={{ width: '20px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody className="myColor2">
                            {renderTable()}
                        </tbody>
                    </Table>
                    <div >

                        <Modal show={show} onHide={modalClose} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title className="ms-auto">Submission Report</Modal.Title>

                            </Modal.Header>

                            <Modal.Body>
                                <select name="category1" value={category} onChange={(evt) => handleCate({ newCate: evt.target.value })} className="btn btn-success btn-sm dropdown-toggle" style={{ width: '150px', marginLeft: '300px', textAlign: "left" }}>
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
                                <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                                    <th style={{ width: "150px" }}>Job Posting ID</th>
                                    <th style={{ width: "200px" }}>Candidate Name</th>
                                    <th style={{ width: "130px" }}>Status</th>
                                    <th style={{ width: "130px" }}>Date</th>
                                    <th style={{ width: "80px" }}>Client Rate</th>
                                    <th style={{ width: "80px" }}>Submitted Rate</th>
                                    {

                                        statusList1.map((cl) => {
                                            if (cl.recruiter.recruiter_id == empID && cl.status == "Submitted" && (cl.candidate == null || cl.candidate.deleted == 1))
                                                return (
                                                    <>
                                                        <tr >
                                                            <td hidden></td>
                                                            <td>{cl.requisition.id}</td>

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
                                <button id="b1" onClick={handleDownload1} className="btn btn-primary">PDF</button>
                                <button id="b2" onClick={handleDownload2} className="btn btn-primary">Excel</button>

                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
            {/* ---------------------new ui code------------------------- */}

        </div>

    ) : (
        history.push("/"),
        window.location.reload()
    );
}
export default ViewAllReq;