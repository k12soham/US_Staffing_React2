import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';

function ViewAllStatusAdmin() {

    const recruiterIDAdmin = localStorage.getItem('recruiterIDAdmin');
    // const statusID = localStorage.getItem('statusID');
    //const requisitionID = localStorage.getItem('requisitionID');

    const [requisitionList, setRequisitionList] = useState([]);
    const [statusList, setstatusList] = useState([]);

    const [statusFD, setstatusFD] = useState([]);
    const [updatestatus, setUpdateStatus] = useState(null);

    const [reqid, setReqid] = useState(null);

    const [inEditMode, setInEditMode,] = useState({
        status: true,
        rowKey: null
    });

    const [status1, setStatus1] = useState(null);
    const [statusDate, setStatusDate] = useState(new Date());
    console.log(statusDate)


    let navigate = useNavigate();

    // let empID = localStorage.getItem("recruiterIDAdmin")
    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    const getStatusData = () => {
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data));
    }

    const deleteBook = (id) => { }

    // const onSave = ({ newReqid, newReqFrom, newId, newClient, newJobTitle, newDuration,
    //     newClientRate, newLocation, newPType, newSkills }) => {

    // }

    const onEdit = ({ statusID, statusNew, statusDateNew }) => {
        console.log('statusID : ' + statusID + ' statusNew :' + statusNew + ' statusDateNew: ' + statusDateNew)

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

        console.log("statusID," + statusID + " newStatus," + newStatus + "newStatusDate," + newStatusDate);

        UpdateStatusByAdmin({ statusID, newStatus, newStatusDate });
    }

    const UpdateStatusByAdmin = ({ statusID, newStatus, newStatusDate }) => {
        let status = newStatus;
        let stDate = newStatusDate;


        // if ((sub < 0) || (first < 0) || (second < 0) || (closure < 0)) {
        //     alert("Please enter positive numbers")
        // }
        // else if (req < 1) {
        //     alert("Atleast one requirement is needed")
        // }
        // else if (sub < first) {
        //     alert("Please enter valid number for first interview")
        // }
        // else if (first < second) {
        //     alert("Please enter valid number for second interview")
        // }
        // else if (second < closure) {
        //     alert("Please enter valid number for closure")
        // }
        // else {
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
        // }
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
    }

    const datechange = (e) => {
        let a = e.d;
        let z = format(a, "yyyy-MM-dd");
        setStatusDate(z);
        console.log('date : ' + z)
    }

    const fetchInventory = () => {
        axios.get(`${base_url}/CurMonthAll`).then(json => setRequisitionList(json.data))

    }
    const getnewID = (e) => {
        let requisitionID = e.rq
        localStorage.setItem("requisitionID", requisitionID)
        //console.log(rq)
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
        let empID = 0;

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
        let empID = 0;

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

    const renderTable = () => {
        let candidate_id = localStorage.getItem("candidateID")
        let requisition_id = localStorage.getItem("requisitionID")
        let recruiter_id = localStorage.getItem("recruiterID")
        return statusList.map(st => {

            var dd = new Date(st.status_date);

            // if (st.requisition.requisition_id == requisitionID && st.flag == 1)
            if (st.requisition.requisition_id == requisition_id &&
                (st.candidate == null || st.candidate.candidate_id == candidate_id)
                && st.recruiter.recruiter_id == recruiter_id)

                return (
                    <tr key={st.status_id}>
                        <td></td>
                        <td>{st.requisition.id}</td>
                        <td>{st.recruiter.recruiter_name}</td>
                        <td>
                            {/* {st.status} */}
                            {
                                inEditMode.status && inEditMode.rowKey === st.status_id ? (
                                    // <input required value={ st.status}
                                    //     onChange={(event) => setStatus1(event.target.value)}
                                    //     style={{ width: "100px" }}
                                    //     minLength={1}
                                    //     maxLength={3}
                                    // />

                                    <select class="btn btn-secondary dropdown-toggle"
                                        style={{ width: '200px' }}
                                        name="status" id="status"
                                        value={status1}
                                        onChange={(event) => setStatus1(event.target.value)}
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
                            {/* {st.status_date} */}
                            {/* {
                                    inEditMode.status && inEditMode.rowKey === st.status_id ? (
                                        <input required value={st.status_date}
                                            onChange={(event) => setStatusDate(event.target.value)}
                                            style={{ width: "100px" }}
                                            minLength={1}
                                            maxLength={3}
                                        />
                                    ) : (
                                        st.status_date
                                    )
                                } */}
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
                                        console.log("null")
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
                                        &nbsp;&nbsp;&nbsp;&nbsp;
                                        <button className="btn btn-sm btn-outline-danger"
                                            onClick={() => { if (window.confirm('Are you sure to delete this requirement?')) deleteBook(st.status_id) }}>{/*Delete*/}<i class="fa fa-trash"></i></button>
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
        <div className="">
            <div className="row">

            <div className="col-12 h-100 master_backgroung_heder">
                <AdminHeader />
            </div>

            <div className=" col-12 master_backgroung_work scroll-bar-horizontal">

                <div style={{ width: '100%' }}  >
                    <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '13px' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '10px' }}>Sr No.</th>
                                <th style={{ width: '10px' }}>RquisitionID</th>
                                <th style={{ width: '10px' }}>Recruiter Name</th>
                                <th style={{ width: '10px' }}>Status</th>
                                <th style={{ width: '10px' }}>Status Date</th>
                                <th style={{ width: '10px' }}>Candidate Name</th>
                                <th style={{ width: '10px' }}>Action</th>
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