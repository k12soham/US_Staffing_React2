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

function ViewAllStatus() {

    const recruiterIDA = localStorage.getItem('recruiterID');
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
                             {st.status} 
                            
                            
                        </td>
                        <td>
                         {st.status_date} 
                           
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
                    <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '10px' }}>Sr No.</th>
                                <th style={{ width: '10px' }}>RquisitionID</th>
                                <th style={{ width: '10px' }}>Recruiter Name</th>
                                <th style={{ width: '10px' }}>Status</th>
                                <th style={{ width: '10px' }}>Status Date</th>
                                <th style={{ width: '10px' }}>Candidate Name</th>
                            
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
export default ViewAllStatus;