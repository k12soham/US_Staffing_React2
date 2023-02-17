import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import Header from "../ViewComponent1/Header";
import EmpSidebar from "../ViewComponent1/EmpSidebar";
import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { toast } from "react-toastify";
function ViewAllRecords2() {


    // const [duration, setDuration] = useState(null);
   
    // const [location, setLocation] = useState(null);
    // const [skills, setSkills] = useState(null);

    const [closureList, setClosureList] = useState([]);
    const [statusList, setstatusList] = useState([]);
    const[candidateList ,setCandidateList]= useState([]);

    const [statusFD, setstatusFD] = useState([]);
    const [updatestatus, setUpdateStatus] = useState(null);
    const[candidateId,setCadidateId] = useState(null);
    const [reqid, setReqid] = useState(null);
    const [reqFrom, setReqFrom] = useState(null);
    const [id, setId] = useState(null);
    const [client, setClient] = useState(null);
    const [jobTitle, setJobTitle] = useState(null);
    const [clientRate, setClientRate] = useState(null);

    const [candidate_name, setCandidate_name] = useState(null);
    const [submitted_rate, setSubmitted_rate] = useState(null);
    const [phone, setPhone] = useState(null);
  

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setClosureList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllCandidate`).then(json =>setCandidateList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json =>setstatusFD(json.data))
      
       
    }, []);

let sessionreq= localStorage.getItem("requisitionid")
let empID= localStorage.getItem("recruiterId")
    console.log(sessionreq)
    console.log(empID)
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
       let c= e.canid;
       setReqid(a)
       setUpdateStatus(b)
       setCadidateId(c)
      

        
    }

    const handleSubmit=(e)=> {
        e.preventDefault();

          let a= reqid;
          let b= updatestatus;
        let c= candidateId;
            postdata(a,b,c);
        
        // 👇️ clear all input values in the form
       // e.target.reset();
    }

   const postdata = (a,b,c) => {
       
      
      

        axios.post(`${base_url}/update_status2?recruiter_id=${empID}&requisition_id=${a}&candidate_id=${c}&status=${b}`).then(

            (response) => {
                toast.success("Status update successfully!",
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
 statusList.map(stt =>
{
    
    <td>{stt.status}</td>
})


       return candidateList.map(can =>{
                   if(can.requisition.requisition_id==sessionreq && can.recruiter.recruiter_id==empID ) 
                    {

        //console.log(candidateList)
            return(
                <tr key={can.candidate_id}>
                    <td></td>
                  <td>{can.candidate_name}</td>
                  <td>{can.visa_type}</td>
                  <td>{can.rate_term}</td>
                <td>{can.submitted_rate}</td>
                <td>{can.phone}</td>
                <td>{can.email}</td>
                {/* <td>{can.remark}</td>
                <td>{can.reason}</td> */}
                    {/* <td style={{ width: '50px' }}>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <input required value={reqFrom}
                                    onChange={(event) => setReqFrom(event.target.value)}
                                    style={{ width: "100px" }}
                                    minLength={1}
                                    maxLength={3}
                                />
                            ) : (
                                cls.requisition_from
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
                    
                    <td>{cls.client_rate}</td>
                    */}
{/* 
                   <td>
                    {
                   candidateList.map(can =>{
                    if(can.requisition.requisition_id==cls.requisition_id )
                    {
                        
                        return(
                            <>
        
                            <td>{can.candidate_name}</td>
                             <td>{can.submitted_rate}</td>
                            <td>{can.phone}</td>
                            </>
                        )
                    }
                    }
                    )
                }
                   </td> */}
                    <td>
                
                {
                         
                     statusList.map(st => {
                       // console.log(st.requisition.requisition_id)
                       // console.log(can.requisition.requisition_id)
                         if(st.requisition.requisition_id==can.requisition.requisition_id 
                            && st.recruiter.recruiter_id==empID && st.flag==1)
                        // ||(st.requisition.requisition_id==can.requisition.requisition_id && st.flag==1 && can.candidate_id==''))
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
                                                   onChange={(evt)=>handleChange({canid:can.candidate_id,rrid:sessionreq, sstt:evt.target.value})}>
                                             {/* > */}
                                              {/*onKeyUp={this.keyUpHandlerReq}
                                             value={this.state.input.rate_term}> */}

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
             </td>
                    {/* <td>
                        {
                            inEditMode.status && inEditMode.rowKey === cls.requisition_id ? (
                                <>
                                    <button

                                        className={"btn btn-outline-success"}
                                        onClick={() => {

                                            onSave(
                                                {
                                                    newReqid: cls.requisition_id, newReqFrom: reqFrom, newId: id,
                                                    newClient: client, newJobTitle: jobTitle
                                                 
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
                                       <i class="fa fa-trash"></i></button>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                </>

                            )
                        }

                    </td> */}
                    
                   
                   
                </tr >

                

            );
              
                }
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
                                <th style={{ width: '150px' }}>Candidate Name</th>
                                <th style={{ width: '90px' }}>Visa Type</th>
                                <th style={{ width: '150px' }}>Rate term</th>
                                <th style={{ width: '160px' }}>Submitted Rate</th>
                                <th style={{ width: '90px' }}>Phone</th>
                                <th style={{ width: '200px' }}>Email</th>
                                {/* <th style={{ width: '200px' }}>Remark</th>
                                <th style={{ width: '200px' }}>Reason</th> */}
                                <th style={{ width: '100px' }}>Status & Date</th>
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
export default ViewAllRecords2;