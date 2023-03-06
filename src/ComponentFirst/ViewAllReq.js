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
    const [searchTerm, setSearchTerm] = useState("");

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });
    let navigate = useNavigate();

    let empID = localStorage.getItem("recruiterID");
    let sessionreq = localStorage.getItem("requisitionID");
    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setClosureList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))


    }, []);

    const deleteBook = (id) => { }

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
    
  
            return (
    
                statusList.filter((cls) => {
                    console.log(cls)
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
    
                    if (cls.recruiter.recruiter_id == empID && cls.requisitionflag == 1 && cls.requisition.deleted==1)
              
                        return (
    
                            <tr key={cls.requisition.requisition_id}>
                                <td></td>
                                <td hidden>{cls.requisition.requisition_id}</td>
                                <td>{cls.requisition.requisition_from}</td>
                                {/* <td>{<a href="/viewCandidate" onClick={(evt) => getnewID({ rq: cls.requisition.requisition_id })}>{cls.requisition.requisition_from}</a>}</td> */}
                                <td>{<a href="/viewCandidate" onClick={(evt) => getnewID({ rq: cls.requisition.requisition_id })}>{cls.requisition.id}</a>}</td>
                                <td>{cls.requisition.client}</td>
                                <td>{cls.requisition.job_title}</td>
                                <td>{cls.requisition.duration}</td>
                                <td>{ cls.requisition.client_rate}</td>
                                <td>{ cls.requisition.location}</td>
                                <td>{cls.requisition.position_type}</td>
                                <td>{cls.requisition.skills}</td>
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
                            </tr>
    
                        )
    
                }))

        }
    

    return (
        // return (
        <div className="">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <EmployeeHeader />
                </div>

                <div className="col-12 master_backgroung_work scroll-bar-horizontal">
                    {/* ---------------------------SearchBar----------------------------- */}
                    <div className="row">
                        <div className="col-12 input-icons"
                         style={{ padding:'5px',margin:'10px' }}>
                            <i className="fa fa-search icon"></i>
                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search"
                                onChange={event => { setSearchTerm(event.target.value) }}
                                style={{ width: '500px', borderRadius: '100px', paddingLeft:'30px'}}
                            />

                        </div>
                    </div>

                <div style={{ backgroundColor: '', width: '' }}  >
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

                                <th style={{ width: '120px' }}>Action</th>

                                </tr>
                            </thead>
                            <tbody>

                                {renderTable()}

                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        //)
    );
}
export default ViewAllReq;