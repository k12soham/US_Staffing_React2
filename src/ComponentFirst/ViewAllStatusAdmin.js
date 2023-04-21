import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import history from './ResponseVal';
import AdminHeader5 from "./AdminHeader5";
function ViewAllStatusAdmin() {

    const recruiterIDAdmin = localStorage.getItem('recruiterIDAdmin');

    const [requisitionList, setRequisitionList] = useState([]);
    const [statusList, setstatusList] = useState([]);

    const [statusFD, setstatusFD] = useState([]);
    const [updatestatus, setUpdateStatus] = useState(null);
    const [currentstatus, setCurrentStatus] = useState(null);

    const [reqid, setReqid] = useState(null);

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    const [status1, setStatus1] = useState(null);
    const [statusDate, setStatusDate] = useState(new Date());
    console.log(statusDate)


    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    const getStatusData = () => {
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data));
    }

    const deleteBook = (id) => {

        axios.delete(`${base_url}/deleteStatusByAdmin?status_id=${id}`)
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

    

    const onEdit = ({ statusID, statusNew, statusDateNew }) => {
       
        setInEditMode({
            status: true,
            rowKey: statusID,
        })

        setStatus1(statusNew);
        setStatusDate(statusDateNew);

        localStorage.setItem('statusID', statusID);

        navigate("/viewAllStatusAdmin");

    }

    const onSave = ({ statusID, newStatus, newStatusDate }) => {

        // if(currentstatus==null)
        // {
        //     alert("Please select status")
        // }
         if(currentstatus==newStatus)
        {
            alert("This status is already saved")
        }
        else{
            UpdateStatusByAdmin({ statusID, newStatus, newStatusDate });
        }       
    }

    const UpdateStatusByAdmin = ({ statusID, newStatus, newStatusDate }) => {

        axios.put(`${base_url}/update_status_Admin?status_id=${statusID}&status=${newStatus}&status_date=${newStatusDate}`, {
        })
            .then(response => {
                onCancel();

                toast.success("Record updated successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "300px" }
                });

                getStatusData();
            },
                (error) => {
                    alert("Enter valid data");
                }
            )     
    }

    const onCancel = () => {
   
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    const datechange = (e) => {
        let a = e.d;
        let z = format(a, "yyyy-MM-dd");
        setStatusDate(z);
  
    }

    const renderTable = () => {
        let candidate_id = localStorage.getItem("candidateID")
        let requisition_id = localStorage.getItem("requisitionID")
        let recruiter_id = localStorage.getItem("recruiterID")


        const isAuthenticated = localStorage.getItem('recruiterRole');


        return isAuthenticated =="Admin" ?statusList.map(st => {
       


            var dd = new Date(st.status_date);

            if (st.requisition.requisition_id == requisition_id &&
                (st.candidate == null || st.candidate.candidate_id == candidate_id)
                && st.recruiter.recruiter_id == recruiter_id)
                  
                return (
                    
                    <tr key={st.status_id}>
                        <td></td>
                        <td>{st.requisition.id}</td>
                        <td>{st.recruiter.recruiter_name}</td>
                        <td>
                            {
                                inEditMode.status && inEditMode.rowKey === st.status_id ? (                                    

                                    <select class="btn btn-sm btn-secondary dropdown-toggle"
                                        style={{ width: '200px' ,  textAlign:"left" }}
                                        name="status" id="status"
                                        value={status1}
                                        
                                        onChange={(event) => {setStatus1(event.target.value)
                                            setCurrentStatus(st.status)}}
                                            
                                    >
                                        <option hidden default select> Select Status</option>

                                        {
                                            statusFD.map((stfd) => (
                                                <option value={stfd.status_fd}>{stfd.status_fd}</option>
                                            ))
                                        }

                                    </select>
                                ) : (
                                    st.status
                                )
                            }
                        </td>
                        <td>
                            {
                                inEditMode.status && inEditMode.rowKey === st.status_id ? (

                                    <DatePicker
                                        style={{ width: '80px' }}
                                        maxDate={new Date()} value={statusDate}
                                        className="datepicker"
                                        openToDate={dd}

                                        onSelect={(date) => { datechange({ d: date }) }}
                                    />
                                ) : (
                                    st.status_date
                                )
                            }
                        </td>
                        <td>
                            {
                                st.candidate == null ?
                                    (
                                        null
                                    ) :
                                    (
                                        st.candidate.candidate_name
                                    )
                            }
                        </td>

                        <td>
                            {
                                inEditMode.status && inEditMode.rowKey === st.status_id ? (
                                    <>
                                        <button

                                            className={"btn btn-sm btn-outline-success"}
                                            onClick={() => {

                                                onSave(
                                                    {
                                                        statusID: st.status_id, newStatus: status1, newStatusDate: statusDate
                                                    })
                                            }
                                            }
                                        >
                                            <i class="fa fa-save"></i>

                                        </button>

                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button
                                            className={"btn btn-sm btn-outline-warning"}

                                            onClick={() => onCancel()}
                                        >
                                            <i class="fa fa-close"></i>
                                        </button>
                                    </>

                                ) : (
                                    <>
                                        <button
                                            style={{ marginRight: '3px' }}
                                            className="btn btn-sm btn-outline-success"
                                            onClick={() => onEdit({
                                                statusID: st.status_id,
                                                statusNew: st.status, statusDateNew: format(dd, "yyyy-MM-dd")
                                            })}
                                        >
                                            <i class="fa fa-edit"></i>
                                        </button>
                                        &nbsp;&nbsp;
                                        <button className="btn btn-sm btn-outline-danger"
                                            onClick={() => { if (window.confirm('Are you sure to delete this status?')) deleteBook(st.status_id) }}>{/*Delete*/}<i class="fa fa-trash"></i></button>
                                        &nbsp;&nbsp;&nbsp;&nbsp;
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

            <div className=" col-12 master_backgroung_work2 scroll-bar-horizontal">

                <div style={{ width: '100%' }}  >
                <br></br><Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                        <thead>
                            <tr>
                            <th style={{ width: '10px' }}>Sr No.</th>
                                    <th style={{ width: '10px' }}>Job Position ID</th>
                                    <th style={{ width: '80px' }}>Recruiter Name</th>
                                    <th style={{ width: '120px' }}>Status</th>
                                    <th style={{ width: '80px' }}>Status Date</th>
                                    <th style={{ width: '100px' }}>Candidate Name</th>
                                    <th style={{ width: '20px' }}>Action</th>
                               
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
export default ViewAllStatusAdmin;