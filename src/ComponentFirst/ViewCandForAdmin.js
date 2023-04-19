import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Button, Table } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import ReactPaginate from 'react-paginate';
import history from './ResponseVal';
import GeneratePDF1 from "./GeneratePDF1";
import DatePicker from "react-datepicker";
import { format } from 'date-fns'
import { Modal } from 'react-bootstrap';
import GeneratePDF2 from "./GeneratePDF2";
import GenerateExcel2 from "./GenerateExcel2";
import AdminHeader5 from "./AdminHeader5";

function ViewCandForAdmin() {

    const requisitionID = localStorage.getItem('requisitionID');

    const [statusList, setstatusList] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
    const [reqid, setReqid] = useState(null);
    const [statusList1, setstatusList1] = useState([]);
    const [isShown, setIsShown] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [isShownError, setIsShownError] = useState(false);
    const [isDownload, setIsDownload] = useState(true);
    const [show, setShow] = useState(false);
    const [category, setCategory] = useState();
    const modalClose = () => setShow(false);
    const modalShow = () => setShow(true);

    let date1 = format(startDate, "dd-MMM-yyyy");
    let date2 = format(endDate, "dd-MMM-yyyy");
    localStorage.setItem("startdate", date1);
    localStorage.setItem("enddate", date2);

    let sessionreq = localStorage.getItem("requisitionID")
    let empID = localStorage.getItem("recruiterID")

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

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

    const onEdit = ({ candidateID }) => {
        localStorage.setItem('candidateID', candidateID);
        navigate("/updateCandidateAdmin");
    }

    const getnewID = (e) => {
        let candidate_id = e.canid
        let requisition_id = e.reqid;
        let recruiter_id = e.recid;
        localStorage.setItem("candidateID", candidate_id)
        localStorage.setItem("requisitionID", requisition_id)
        localStorage.setItem("recruiterID", recruiter_id)

    }

    const items = [1, 2, 3];

    function PaginatedItems({ itemsPerPage }) {

        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <renderTable currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={0}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </>
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

    const handleDownload1 = () => {
        console.log(statusList1)
        GeneratePDF2(statusList1);
    }

    const handleDownload2 = (evt) => {
        GenerateExcel2(statusList1);
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
            postGetDataBetDates(date1, date2, sessionreq);
        }
        else {
            postGetDataByCate(cate, sessionreq);
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
            postGetDataBetDates(f1, f2, sessionreq);
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
            postGetDataBetDates(f1, f2, sessionreq);
        } else {
            alert("Enter valid date");
        }
    }
    const postGetDataBetDates = (f1, f2, f3) => {
        // axios.get(`${base_url}/get_cls_byDate?empid=${f}&date1=${f1}&date2=${f2}`).then(json => setClosureList(json.data))
        axios.get(`${base_url}/get_cls_byDateAdmin?date1=${f1}&date2=${f2}&requisition_id=${f3}`)
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

    const postGetDataByCate = (d2, d3) => {

        axios.get(`${base_url}/get_cls_by_QuarterlyAdmin?category=${d2}&requisition_id=${d3}`)
            .then(
                json => setstatusList1(json.data),


            )
            .catch(error => {

            })

    }



    const renderTable = () => {

        const isAuthenticated = localStorage.getItem('recruiterRole');


        return isAuthenticated == "Admin" ? statusList.map(st => {

            if (st.requisition.requisition_id == requisitionID && st.flag == 1 && (st.candidate == null || st.candidate.deleted == 1))

                return (

                    <tr key={st.status_id}>
                        <td></td>
                        <td>
                            {
                                st.candidate == null ?
                                    (
                                        <a href="/viewAllStatusAdmin" onClick={(evt) => getnewID({
                                            reqid: st.requisition.requisition_id,
                                            recid: st.recruiter.recruiter_id
                                        })}>All Status</a>
                                    ) :
                                    (
                                        <a href="/viewAllStatusAdmin" onClick={(evt) => getnewID({
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
                        <td>{st.status_date}</td>
                        <td>{st.recruiter.recruiter_name}</td>
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
                                st.candidate == null ?
                                    (
                                        console.log("null")
                                    ) :
                                    (
                                        <>
                                            &nbsp;
                                            <button
                                                style={{ marginRight: '3px' }}
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
                    </tr >
                );
        }

        ) : (
            history.push("/"),
            window.location.reload()
        );
    }

    return (
        <div className="">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <AdminHeader5 />
                </div>

                <div className="col-12 master_backgroung_work scroll-bar-horizontal">

                    <div style={{ width: '' }}  >
                        <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Sr No.</th>
                                    <th style={{ width: '110px' }}>View All Status</th>
                                    <th style={{ width: '140px' }}>Candidate Name</th>
                                    <th style={{ width: '120px' }}>Current Status </th>
                                    <th style={{ width: '100px' }}>Date </th>
                                    <th style={{ width: '100px' }}>Recruiter Name</th>
                                    <th style={{ width: '50px' }}>Visa Type</th>
                                    <th style={{ width: '60px' }}>Rate term</th>
                                    <th style={{ width: '60px' }}>Client Rate</th>
                                    <th style={{ width: '20px' }}>Submitted Rate</th>
                                    <th style={{ width: '70px' }}>Phone</th>
                                    <th style={{ width: '130px' }}>Email</th>
                                    <th style={{ width: '100px' }}>Remark</th>
                                    <th style={{ width: '100px' }}>Reason</th>

                                    <th style={{ width: '115px' }}>Action</th>
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
                                    <Button variant="success" className="btn btn-primary btn-sm fa fa-download" onClick={modalShow}>
                                        Download
                                    </Button>
                                    <Modal show={show} onHide={modalClose}>
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
                                            <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                                                <th style={{ width: "150px" }}>Recruiter</th>
                                                <th style={{ width: "150px" }}>Candidate</th>
                                                <th style={{ width: "90px" }}>Status</th>
                                                <th style={{ width: "100px" }}>Date</th>
                                                <th style={{ width: "70px" }}>Client Rate</th>
                                                <th style={{ width: "20px" }}>Submit Rate</th>

                                                {

                                                    statusList1.map((cl) => {
                                                        if (cl.requisition.requisition_id == sessionreq
                                                            && cl.recruiter.recruiter_id == empID && cl.status == "Submitted" && (cl.candidate == null || cl.candidate.deleted == 1))
                                                            return (
                                                                <>

                                                                    <tr >
                                                                        <td hidden></td>
                                                                        <td >
                                                                            {
                                                                                cl.recruiter == null ?
                                                                                    (
                                                                                        console.log("null")
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
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ViewCandForAdmin;