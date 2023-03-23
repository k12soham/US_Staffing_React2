import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import ReactPaginate from 'react-paginate';
import history from './ResponseVal';
function ViewAllReq() {

    const recruiterID = localStorage.getItem('recruiterID');

    const [requisitionList, setRequisitionList] = useState([]);
    const [statusList, setstatusList] = useState([]);

    const [statusFD, setstatusFD] = useState([]);
  
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

    const [currentPage, setCurrentPage] = useState(1);
    const [tableRowsPerPage, setTableRowsPerPage] = useState(3);

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
        localStorage.setItem("requisitionID", rq)
    
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
                            <td>{<a href="/viewCandidate" onClick={(evt) => getnewID({ rq: cls.requisition.requisition_id })}>{cls.requisition.id}</a>}</td>
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
    const isAuthenticated = localStorage.getItem('recruiterID');

        return isAuthenticated ? (
   
    

        <div className="">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <EmployeeHeader />
                </div>

                <div className="col-12 master_backgroung_work scroll-bar-horizontal">
                    {/* ---------------------------SearchBar----------------------------- */}
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
                        <Table  className="table table-sm table-striped table-bordered"  bordered style={{ fontFamily: 'arial', fontSize: '14px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '20px' }}>Sr No.</th>
                                    <th style={{ width: '160px' }}>Requisition From</th>
                                    <th style={{ width: '120px' }}>Job Posting ID</th>
                                    <th style={{ width: '180px' }}>Client</th>
                                    <th style={{ width: '160px' }}>Job Title</th>
                                    <th style={{ width: '70px' }}>Duration</th>
                                    <th style={{ width: '40px' }}>Client Rate</th>
                                    <th style={{ width: '100px' }}>Location</th>
                                    <th style={{ width: '80px' }}>Position Type</th>
                                    <th style={{ width: '150px' }}>Skills</th>
                                    <th style={{ width: '30px' }}>Action</th>

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
       
        ) : (
            history.push("/"),
            window.location.reload()
        );
}
export default ViewAllReq;