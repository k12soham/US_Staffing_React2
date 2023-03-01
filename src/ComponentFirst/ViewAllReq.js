import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";

import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ViewAllReq() {

    const recruiterID = localStorage.getItem('recruiterID');

    const [closureList, setClosureList] = useState([]);
    const [statusList, setstatusList] = useState([]);

    const [statusFD, setstatusFD] = useState([]);
    const [updatestatus, setUpdateStatus] = useState(null);

    const [reqid, setReqid] = useState(null);
    const [reqFrom, setReqFrom] = useState(null);
    const [id, setId] = useState(null);
    const [client, setClient] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [duration, setDuration] = useState(null);
    const [clientRate, setClientRate] = useState(null);
    const [ptype, setPType] = useState(null);
    const [location, setLocation] = useState(null);
    const [skills, setSkills] = useState(null);
    const [status, setStatus] = useState(null);

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });
    let navigate = useNavigate();

    let empID= localStorage.getItem("recruiterID");
    let sessionreq = localStorage.getItem("requisitionID");
    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setClosureList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))


    }, []);

    const deleteBook = (id) => { }

    // const updateRequisition = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
    //     newClientRate, newLocation, newPType, newSkills }) => {

    //         axios.post(`${base_url}/update_requsition?requisition_id=${newReqid}&requisition_from=${newReqFrom}
    //         &id=${newId}&client=${newClient}&job_title=${newJobTitle}&duration=${newDuration}&client_rate=${newClientRate}&location=${newLocation}&
    //         position_type=${newPType}&skills=${newSkills}`).then(
    //             (response)=>{
    //                 toast.success("Record updated successfully!", {position: 'top-right'});
    //             },
    //             (error)=>{
    //                 alert("Please enter valid details.");
    //             }
    //         )
    //     alert("update val successfully")
    // }

    const onSave = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        newClientRate, newLocation, newPType, newSkills }) => {

        // console.log("clsid,"+clsid+" newReq,"+newReq+ "newSub,"+newSub+" newFirst,"+newFirst+" newSecond,"+newSecond+" newClosure,"+newClosure+" y "+y);
        // updateRequisition({
        //     newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        //     newClientRate, newLocation, newSkills
        // });
    }
    const handleChange = (e) => {

        let a = e.rrid;
        let b = e.sstt
        setReqid(a)
        setUpdateStatus(b)
        console.log(a);
        console.log(b);
        //console.log(updatestatus);

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let a = reqid;
        let b = updatestatus;

        postdata(a, b);

        // 👇️ clear all input values in the form
        // e.target.reset();
    }

    const postdata = (a, b) => {
        let recruiter_id = 2;
        let candidate_id = 0;


        axios.post(`${base_url}/update_status?recruiter_id=${recruiter_id}&requisition_id=${a}&candidate_id=${candidate_id}&status=${b}`).then(

            (response) => {
                toast.success("Requirement added successfully!",
                    { position: "top-right" }
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
    const onEdit = ({ requisitionID }) => {
        // ({ crrReqid, crrReqFrom, crrId, crrClient, crrJobTitle, crrDuration,
        // crrClientRate, crrLocation, crrPType, crrSkills}) => {


        console.log(requisitionID);
        localStorage.setItem('recruiterID', recruiterID);
        localStorage.setItem('requisitionID', requisitionID);

        navigate("/updateRequisition");

        setInEditMode({
            status: true,
            rowKey: requisitionID,
        })
        // setReqFrom(crrReqFrom);
        // setId(crrId);
        // setClient(crrClient);
        // setJobTitle(crrJobTitle);
        // setDuration(crrDuration);
        // setClientRate(crrClientRate);
        // setLocation(crrLocation);
        // setPType(crrPType);
        // setSkills(crrSkills);

    }

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    const fetchInventory = () => {
        axios.get(`${base_url}/CurMonthAll`).then(json => setClosureList(json.data))

    }
    const getnewID = (e) => {
        let rq = e.rq
        localStorage.setItem("requisitionID", rq)
        //console.log(rq)
    }

    const renderTable = () => {
        return statusList.map(cls => {
                if(cls.recruiter.recruiter_id==empID && cls.requisitionflag==1)
            return (

                <tr key={cls.requisition.requisition_id}>
                    <td></td>
                    <td hidden>{cls.requisition.requisition_id}</td>
                    <td style={{ width: '50px' }}>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required
                                    type='text'
                                    value={reqFrom}
                                    onChange={(event) => setReqFrom(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={2}
                                    maxLength={50}
                                />
                            ) : (

                                <a href="/viewCandidate" onClick={(evt) => getnewID({ rq: cls.requisition.requisition_id })}>{cls.requisition.requisition_from}</a>
                            )

                        }


                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required
                                    type='number'
                                    value={id}
                                    onChange={(event) => setId(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={2}
                                    maxLength={10}
                                />
                            ) : (
                                cls.requisition.id
                            )
                        }

                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required
                                    type='text'
                                    value={client}
                                    onChange={(event) => setClient(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={2}
                                    maxLength={50}
                                />
                            ) : (
                                cls.requisition.client
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required
                                    type='text'
                                    value={jobTitle}
                                    onChange={(event) => setJobTitle(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={2}
                                    maxLength={50}
                                />
                            ) : (
                                cls.requisition.job_title
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required
                                    type='text'
                                    value={duration}
                                    onChange={(event) => setDuration(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={2}
                                    maxLength={20}
                                />
                            ) : (
                                cls.requisition.duration
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required value={clientRate}
                                    onChange={(event) => setDuration(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requisition.client_rate
                            )
                        }
                    </td>
                    {/* <td>{cls.client_rate}</td> */}
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required value={location}
                                    onChange={(event) => setDuration(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requisition.location
                            )
                        }
                    </td>
                    {/* <td>{cls.location}</td> */}
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required value={ptype}
                                    onChange={(event) => setDuration(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requisition.position_type
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <input required value={skills}
                                    onChange={(event) => setDuration(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requisition.skills
                            )
                        }
                    </td>
                    {/* <td>{cls.skills}</td> */}

                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition.requisition_id ? (
                                <>
                                    <button

                                        className={"btn btn-outline-success"}
                                        onClick={() => {

                                            onSave(
                                                {
                                                    newReqid: cls.requisition_id, newReqFrom: reqFrom, newId: id,
                                                    newClient: client, newJobTitle: jobTitle, newDuration: duration,
                                                    newClientRate: clientRate, newLocation: location, newPType: ptype, newSkills: skills,

                                                })
                                        }
                                        }
                                    >
                                        <i class="fa fa-save"></i>
                                    </button>

                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button
                                        className={"btn btn-outline-warning"}

                                        onClick={() => onCancel()}
                                    >
                                        <i class="fa fa-close"></i>
                                    </button>
                                </>

                            ) : (
                                <>
                                    <button
                                        className="btn btn-outline-success"

                                        onClick={() => onEdit({

                                            requisitionID: cls.requisition.requisition_id,

                                            // crrReqid: cls.requisition_id, crrReqFrom: cls.requisition_from, crrId: cls.id,
                                            // crrClient: cls.client, crrJobTitle: cls.job_title, crrDuration: cls.duration,
                                            // crrClientRate: cls.client_rate, crrLocation: cls.location, crrPType: cls.position_type,
                                            // crrSkills: cls.skills,

                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete this requirement?')) deleteBook(cls.requisition.requisition_id) }}>
                                        {/*Delete*/}<i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>
                </tr >
            );
        })
    }



    return (
        // return (
        <div className="container-fluid">

            <div className="col-12 h-100 master_backgroung_heder">
                <EmployeeHeader />
            </div>

            <div className="master_backgroung_work scroll-bar-horizontal">

                <div style={{ backgroundColor: '', width: '1500px' }}  >
                    <Table bordered class="table table-sm" style={{ fontFamily: 'arial' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '10px' }}>Sr No.</th>
                                <th style={{ width: '150px' }}>Requisition From</th>
                                <th style={{ width: '90px' }}>ID</th>
                                <th style={{ width: '150px' }}>Client</th>
                                <th style={{ width: '160px' }}>Job Title</th>
                                <th style={{ width: '70px' }}>Duration</th>
                                <th style={{ width: '100px' }}>Client Rate</th>
                                <th style={{ width: '100px' }}>Location</th>
                                <th style={{ width: '120px' }}>Position Type</th>
                                <th style={{ width: '150px' }}>Skills</th>

                                <th style={{ width: '125px' }}>Action</th>

                            </tr>
                        </thead>
                        <tbody>

                            {renderTable()}


                        </tbody>
                    </Table>

                </div>
            </div>
        </div>
        //)
    );
}
export default ViewAllReq;