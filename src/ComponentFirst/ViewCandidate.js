import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ViewCandidate() {

    const [statusList, setstatusList] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
    const [updatestatus, setUpdateStatus] = useState(null);
    const [currentstatus, setCurrentStatus] = useState(null);
    const [reqid, setReqid] = useState(null);
    
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    useEffect(() => {
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    let sessionreq = localStorage.getItem("requisitionID")
    let empID = localStorage.getItem("recruiterID")


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
        let c= e.currentst;    

        setReqid(a)
        setUpdateStatus(b)
        setCurrentStatus(c)
    }

    const handleSubmit = (e) => {
        let a = reqid;
        let b = updatestatus;
        let c= currentstatus;

        if(b==c)
        {
            alert("This status is already saved")
        }
        else{
            postdata(a,b);
        }  
    }

    const handleSubmit2 = (e) => {

        let a = reqid;
        let b = updatestatus;
        let c = e.canid
        let d= currentstatus;
     
        if(b==d)
        {
            alert("This status is already saved")
        }
        else{
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

    const onCancel = () => {
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    const getnewID = (e) => {
        let candidate_id = e.canid
        let requisition_id = e.reqid;
        let recruiter_id = e.recid;
        localStorage.setItem("candidateID", candidate_id)
        localStorage.setItem("requisitionID", requisition_id)
        localStorage.setItem("recruiterID", recruiter_id)

    }

    const renderTable = () => {
        const isAuthenticated = localStorage.getItem('recruiterID');
        localStorage.setItem('recruiterID', isAuthenticated);
       
        return isAuthenticated ? (

            statusList.filter((st) => {

                if (searchTerm === "") {
                    return st;
                }  
                else if(st.status_date.toLowerCase().includes(searchTerm.toLowerCase())) {
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
                            <td style={{overflow:"false"}}>{st.status_date}</td>    

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
                                        style={{ width: '140px',fontFamily: 'arial', fontSize: '13px' }}
                                        name="status" id="status"

                                        onChange={(evt) => handleChange({
                                            rrid: sessionreq, sstt: evt.target.value, currentst:st.status
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
                                            <button onClick={handleSubmit} class="btn btn-sm btn-primary fa fa-save"></button>
                                        ) :
                                        (
                                            <button class="btn btn-sm btn-primary fa fa-save" onClick={() => handleSubmit2({ canid: st.candidate.candidate_id })}></button>
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

                    </div>
                </div>
            </div>
        </div>

    );
}
export default ViewCandidate;