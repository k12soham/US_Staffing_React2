import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import EmployeeHeader from "./EmployeeHeader";
import history from './ResponseVal';
function ViewAllStatus() {

    const [requisitionList, setRequisitionList] = useState([]);
    const [statusList, setstatusList] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
 
    const [statusDate, setStatusDate] = useState(new Date());
    console.log(statusDate)


  

    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    const renderTable = () => {
        let candidate_id = localStorage.getItem("candidateID")
        let requisition_id = localStorage.getItem("requisitionID")
        let recruiter_id = localStorage.getItem("recruiterID")

        const isAuthenticated = localStorage.getItem('recruiterRole');

        return isAuthenticated=="TM" ? statusList.map(st => {



            if (st.requisition.requisition_id == requisition_id &&
                (st.candidate == null || st.candidate.candidate_id == candidate_id)
                && st.recruiter.recruiter_id == recruiter_id)

                return (
                    <tr key={st.status_id}>
                        <td></td>
                        <td>{st.requisition.id}</td>
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
                    <EmployeeHeader />
                </div>

                <div className=" col-12 master_backgroung_work2 scroll-bar-horizontal">

                    <div style={{ width: '100%' }}  >
                    <br></br>  <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '10px' }}>Sr No.</th>
                                    <th style={{ width: '10px' }}>Job Position ID</th>
                                    <th style={{ width: '150px' }}>Status</th>
                                    <th style={{ width: '80px' }}>Status Date</th>
                                    <th style={{ width: '120px' }}>Candidate Name</th>

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
export default ViewAllStatus;