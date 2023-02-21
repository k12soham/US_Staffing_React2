import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import Header from "../ViewComponent1/Header";
import EmpSidebar from "../ViewComponent1/EmpSidebar";
import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { toast } from "react-toastify";
function ViewAllRecords() {

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
    const [location, setLocation] = useState(null);
    const [skills, setSkills] = useState(null);
    const [status, setStatus] = useState(null);

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setClosureList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json =>setstatusFD(json.data))
      
       
    }, []);

    const deleteBook = (id) => { }

    const updateInventory = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        newClientRate, newLocation, newSkills }) => {
        alert("update val successfully")
    }

    const onSave = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
        newClientRate, newLocation, newSkills }) => {

        // console.log("clsid,"+clsid+" newReq,"+newReq+ "newSub,"+newSub+" newFirst,"+newFirst+" newSecond,"+newSecond+" newClosure,"+newClosure+" y "+y);
        updateInventory({
            newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
            newClientRate, newLocation, newSkills
        });
    }
    const handleChange= (e)=> {

       let a= e.rrid;
       let b= e.sstt
       setReqid(a)
       setUpdateStatus(b)
       console.log(a);
       console.log(b);
    //console.log(updatestatus);
        
    }

    const handleSubmit=(e)=> {
        e.preventDefault();

          let a= reqid;
          let b= updatestatus;

            postdata(a,b);
        
        // 👇️ clear all input values in the form
       // e.target.reset();
    }

   const postdata = (a,b) => {
        let recruiter_id = 2;
        let candidate_id= 0;
      

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
    const onEdit = ({ crrReqid, crrReqFrom, crrId, crrClient, crrJobTitle, crrDuration,
        crrClientRate, crrLocation, crrSkills}) => {
           
        setInEditMode({
            status: true,
            rowKey: crrReqid,
        })
        setReqFrom(crrReqFrom);
        setId(crrId);
        setClient(crrClient);
        setJobTitle(crrJobTitle);
        setDuration(crrDuration);
        setClientRate(crrClientRate);
        setLocation(crrLocation);
        setSkills(crrSkills);
        
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
    const getnewID = (e)=>{
        let rq= e.rq
        localStorage.setItem("requisitionID",rq)
        //console.log(rq)
    }

    const renderTable = () => {
        return closureList.map(cls => {
           
            return (
                
                <tr key={cls.requisition_id}>
                    <td></td>
                    <td hidden>{cls.requisition_id}</td>
                    <td style={{ width: '50px' }}>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={reqFrom}
                                    onChange={(event) => setReqFrom(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                //  cls.requisition_from
                                // <a href="view_all2/${abc}" >{cls.requisition_from}</a>
                         
                                <a href="view3" onClick={(evt)=>getnewID({rq: cls.requisition_id})}>{cls.requisition_from}</a>
                            )
                            
                        }
                       
                         
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={id}
                                    onChange={(event) => setId(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.id
                            )
                        }

                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={client}
                                    onChange={(event) => setClient(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.client
                            )
                        }
                    </td>
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={jobTitle}
                                    onChange={(event) => setJobTitle(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.job_title
                            )
                        }
                    </td>
                   <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={duration}
                                    onChange={(event) => setDuration(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.duration
                            )
                        }
                    </td>
                    <td>{cls.client_rate}</td>
                    <td>{cls.location}</td>
                    <td>{cls.skills}</td>
                    {/*  <td>
                
                        {
                                
                            statusList.map(st => {
                                console.log("status rq id : " +st.requisition.requisition_id);                                
                                console.log("requisition rq id : " +cls.requisition_id);

                                if(st.requisition.requisition_id==cls.requisition_id && st.flag==1)
                                {
                                    return (
                                        <>
                                        <td>{st.status}</td>
                                        <td>{st.status_date}</td>
                                        <td>
                        {
                           
                        <select class="btn btn-secondary dropdown-toggle"
                                                    style={{ width: '100%' }}
                                                    name="status" id="status"
                                                    // onChange={(evt)=>setUpdateStatus(evt.target.value)}>
                                                         onChange={(evt)=>handleChange({rrid: cls.requisition_id, sstt:evt.target.value})}>
                                                    
                                                     {/*onKeyUp={this.keyUpHandlerReq}
                                                    value={this.state.input.rate_term}> 

                                                    <option value='' default selected> Select Status</option>
                                                 
                                                    {
                                             statusFD.map((stfd) => (

                                                <option value={stfd.status_fd}>{stfd.status_fd}</option>
                                               ))

                                             }  
                                               
                                                </select>
                                              

                        }
                        
                           <button onClick={handleSubmit}>Change Status</button> 
                    </td>
                                        
                                        </>
                                            )
                                        
                                       }
                                })
                                
                                
                        }
                    </td> */}
                    <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <>
                                    <button

                                        className={"btn btn-outline-success"}
                                        onClick={() => {

                                            onSave(
                                                {
                                                    newReqid: cls.requisition_id, newReqFrom: reqFrom, newId: id,
                                                    newClient: client, newJobTitle: jobTitle, newDuration: duration,
                                                    newClientRate: clientRate, newLocation: location, newSkills: skills,
                                                 
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
                                           
                                            crrReqid: cls.requisition_id, crrReqFrom: cls.requisition_from, crrId: cls.id,
                                            crrClient: cls.client, crrJobTitle: cls.job_title, crrDuration: cls.duration,
                                            crrClientRate: cls.client_rate, crrLocation: cls.location, crrSkills: cls.skills,
                                           
                                        })}
                                    >
                                        <i class="fa fa-edit"></i>

                                    </button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-outline-danger"
                                        onClick={() => { if (window.confirm('Are you sure to delete this requirement?')) deleteBook(cls.closureid) }}>
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

                <div style={{ backgroundColor: '', width: '2100px' }}  >
                    <Table bordered>
                        <thead>
                            <tr>
                                <th style={{ width: '10px' }}>Sr No.</th>
                                <th style={{ width: '150px' }}>Requisition From</th>
                                <th style={{ width: '90px' }}>ID</th>
                                <th style={{ width: '150px' }}>Client</th>
                                <th style={{ width: '160px' }}>Job Title</th>
                                <th style={{ width: '70px' }}>Duration</th>
                                <th style={{ width: '100px' }}>Client Rate</th>
                                <th style={{ width: '130px' }}>Location</th>
                                <th style={{ width: '200px' }}>Skills</th>
                                
                                <th style={{ width: '95px' }}>Action</th>
                               
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
export default ViewAllRecords;
