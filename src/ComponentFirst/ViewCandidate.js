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
    const [candidateId, setCadidateId] = useState(null);
    const [candi, setCandi] = useState(null);
    const [reqid, setReqid] = useState(null);
    const [reqFrom, setReqFrom] = useState(null);
    const [id, setId] = useState(null);
    const [client, setClient] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [clientRate, setClientRate] = useState(null);

    const [candidate_name, setCandidate_name] = useState(null);
    const [submitted_rate, setSubmitted_rate] = useState(null);
    const [phone, setPhone] = useState(null);
    let navigate = useNavigate();


    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setClosureList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllCandidate`).then(json => setCandidateList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))


    }, []);

    let sessionreq = localStorage.getItem("requisitionID")
    let empID = localStorage.getItem("recruiterID")
    console.log(sessionreq)
    console.log(empID)
    const deleteBook = (id) => { }

    const updateInventory = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        newClientRate, newLocation, newSkills }) => {
        alert("update val successfully")
    }

    const onSave = ({candidateID}) => {

        console.log(candidateID);
        // console.log("clsid,"+clsid+" newReq,"+newReq+ "newSub,"+newSub+" newFirst,"+newFirst+" newSecond,"+newSecond+" newClosure,"+newClosure+" y "+y);
        // updateInventory({
        //     newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        //     newClientRate, newLocation, newSkills
        // });
    }
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
    const onEdit = ({ candidateID}) => {
        console.log(candidateID);

        localStorage.setItem('candidateID', candidateID);

         navigate("/updateCandidate");

        setInEditMode({
            status: true,
            rowKey: candidateID,
        })
        // setReqFrom(crrReqFrom);
        // setId(crrId);
        // setClient(crrClient);
        // setJobTitle(crrJobTitle);

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

    const renderTable = () => {

       return  statusList.map(st => {
       // console.log(st.requisition.requisition_id)
      //  console.log(sessionreq)
            if(st.requisition.requisition_id==sessionreq
              && st.recruiter.recruiter_id==empID && st.flag==1)
             // console.log(st.requisition.requisition_id)
             // console.log(sessionreq)
           // ||(st.requisition.requisition_id==can.requisition.requisition_id && st.flag==1 && can.candidate_id==''))
            
                return(
                    <tr key={st.status_id}>
                        <td></td>
                    <td>{st.status}</td>
                    <td>{st.status_date}</td>
                    <td>
    {
       
    <select class="btn btn-secondary dropdown-toggle"
                                style={{ width: '155px' }}
                                name="status" id="status"
                             
                            onChange={(evt)=>handleChange({rrid:sessionreq, sstt:evt.target.value
                        })}>
                            {/* ,setCandi(st.candidate.candidate_id))}> */}
                         

                       
                                <option hidden  default selected> Select Status</option>
                             
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
     st.candidate==null?
    (
        <button onClick={handleSubmit}  class="btn btn-primary fa fa-save"></button> 
    ):
    (
        <button class="btn btn-primary fa fa-save" onClick={()=>handleSubmit2({canid:st.candidate.candidate_id})}></button> 
        
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
                            inEditMode.status && inEditMode.rowKey === st.candidate_id ? (
                                <>
                                    <button

                                        className={"btn btn-outline-success"}
                                        onClick={() => {

                                            onSave(
                                                {
                                                    candidateID : st.candidate_id
                                                    // newReqid: cls.requisition_id, newReqFrom: reqFrom, newId: id,
                                                    // newClient: client, newJobTitle: jobTitle, newDuration: duration,
                                                    // newClientRate: clientRate, newLocation: location, newPType: ptype, newSkills: skills,
                                                 
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

                                            candidateID : st.candidate.candidate_id                                            
                                           
                                        //     crrReqid: cls.requisition_id, crrReqFrom: cls.requisition_from, crrId: cls.id,
                                        //     crrClient: cls.client, crrJobTitle: cls.job_title, crrDuration: cls.duration,
                                        //     crrClientRate: cls.client_rate, crrLocation: cls.location, crrPType: cls.position_type,
                                        //     crrSkills: cls.skills,
                                           
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete this requirement?')) deleteBook(st.candidate_id) }}>
                                        {/*Delete*/}<i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td>
                </tr>

            )
        })
    }

    return (
        // return (
        <div className="container-fluid">

            <div className="col-12 h-100 master_backgroung_heder">
                <EmployeeHeader />
            </div>

            <div className="master_backgroung_work scroll-bar-horizontal">

                <div style={{ backgroundColor: '', width: '1900px' }}  >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th style={{ width: '10px' }}>Sr No.</th>
                                <th style={{ width: '120px' }}>Current Status </th>
                                <th style={{ width: '100px' }}>Date </th>
                                <th style={{ width: '200px' }}>Status </th>
                                <th style={{ width: '150px' }}>Candidate Name</th>
                                <th style={{ width: '50px' }}>Visa Type</th>
                                <th style={{ width: '60px' }}>Rate term</th>
                                <th style={{ width: '20px' }}>Submitted Rate</th>
                                <th style={{ width: '70px' }}>Phone</th>
                                <th style={{ width: '150px' }}>Email</th>
                                <th style={{ width: '100px' }}>Remark</th>
                                <th style={{ width: '100px' }}>Reason</th>

                                <th style={{ width: '140px' }}>Action</th>

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
export default ViewCandidate;