import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ViewCandidate() {
    // const [duration, setDuration] = useState(null);

    // const [location, setLocation] = useState(null);
    // const [skills, setSkills] = useState(null);

    const [closureList, setClosureList] = useState([]);
    const [statusList, setstatusList] = useState([]);
    const [candidateList, setCandidateList] = useState([]);

    const [statusFD, setstatusFD] = useState([]);
    const [updatestatus, setUpdateStatus] = useState(null);
    // const [candidateId, setCadidateId] = useState(null);
    // const [candi, setCandi] = useState(null);
    const [reqid, setReqid] = useState(null);
    // const [reqFrom, setReqFrom] = useState(null);
    // const [id, setId] = useState(null);
    // const [client, setClient] = useState(null);
    // const [jobTitle, setJobTitle] = useState(null);
    // const [clientRate, setClientRate] = useState(null);

    // const [candidate_name, setCandidate_name] = useState(null);
    // const [submitted_rate, setSubmitted_rate] = useState(null);
    // const [phone, setPhone] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    useEffect(() => {
        // axios.get(`${base_url}/getAllRequisition`).then(json => setClosureList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        // axios.get(`${base_url}/getAllCandidate`).then(json => setCandidateList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    let sessionreq = localStorage.getItem("requisitionID")
    let empID = localStorage.getItem("recruiterID")
    console.log(sessionreq)
    console.log(empID)

    const deleteBook = (candidateID) => {

        console.log(candidateID);
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
                    // alert("Enter valid data");
                });
    }

    // const updateInventory = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
    //     newClientRate, newLocation, newSkills }) => {
    //     alert("update val successfully")
    // }

    // const onSave = ({ candidateID }) => {

    //     console.log(candidateID);

    // }


    const handleChange = (e) => {

        let a = e.rrid;
        let b = e.sstt
        //let c= e.canid;
        console.log(a, b)

        setReqid(a)
        setUpdateStatus(b)

    }

    const handleSubmit = (e) => {

        console.log("submit11111111")
        let a = reqid;
        let b = updatestatus;

        console.log(a, b)
        postdata(a, b);

    }

    const handleSubmit2 = (e) => {

        // e.preventDefault();
        console.log("submit222222")
        let a = reqid;
        let b = updatestatus;
        let c = e.canid

        console.log(a, b, c)
        postdata2(a, b, c);
    }

    const postdata = (a, b) => {

        console.log(a, b)

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

        console.log(a, b, c)

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
        console.log(candidateID);

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

        return (

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
                                            })}>View All Status</a>

                                        ) :
                                        (

                                            <a href="/viewAllStatus" onClick={(evt) => getnewID({
                                                canid: st.candidate.candidate_id, reqid: st.requisition.requisition_id,
                                                recid: st.recruiter.recruiter_id
                                            })}>View All Status</a>


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

                            <td>
                                {
                                    <select class="btn btn-sm btn-secondary dropdown-toggle"
                                        style={{ width: '140px', fontFamily: 'arial', fontSize: '14px' }}
                                        name="status" id="status"

                                        onChange={(evt) => handleChange({
                                            rrid: sessionreq, sstt: evt.target.value
                                        })}>
                                        {/* ,setCandi(st.candidate.candidate_id))}> */}
                                        <option hidden default selected> Select Status</option>

                                        {
                                            statusFD.map((stfd) => (

                                                <option value={stfd.status_fd}>{stfd.status_fd}</option>
                                            ))
                                        }
                                    </select>
                                }
                                &nbsp;&nbsp;&nbsp;
                                {/* <button onClick={handleSubmit}>Change Status</button>  */}

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
                        </tr>
                    )

            }))


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
                        <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Sr No.</th>
                                    <th style={{ width: '110px' }}>View All Status</th>
                                    <th style={{ width: '140px' }}>Candidate Name</th>
                                    <th style={{ width: '120px' }}>Current Status </th>
                                    <th style={{ width: '90px' }}>Date </th>
                                    <th style={{ width: '200px' }}>Status </th>
                                    <th style={{ width: '50px' }}>Visa Type</th>
                                    <th style={{ width: '60px' }}>Rate term</th>
                                    <th style={{ width: '60px' }}>Client Rate</th>
                                    <th style={{ width: '20px' }}>Submitted Rate</th>
                                    <th style={{ width: '70px' }}>Phone</th>
                                    <th style={{ width: '130px' }}>Email</th>
                                    <th style={{ width: '100px' }}>Remark</th>
                                    <th style={{ width: '100px' }}>Reason</th>
                                    <th style={{ width: '100px' }}>Action</th>

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