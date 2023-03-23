import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import ReactPaginate from 'react-paginate';
function ViewCandForAdmin() {

    const recruiterIDAdmin = localStorage.getItem('recruiterIDAdmin');
    const requisitionID = localStorage.getItem('requisitionID');

    const [statusList, setstatusList] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
    const [reqid, setReqid] = useState(null);

    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

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
                    console.log(error);
                });
    }

    const onEdit = ({ candidateID }) => {
        localStorage.setItem('candidateID', candidateID);
        navigate("/updateCandidate");
    }

    const getnewID = (e) => {
        let candidate_id = e.canid
        let requisition_id = e.reqid;
        let recruiter_id = e.recid;
        localStorage.setItem("candidateID", candidate_id)
        localStorage.setItem("requisitionID", requisition_id)
        localStorage.setItem("recruiterID", recruiter_id)
        console.log("candidate_id= " + candidate_id + "requisition_id= " + requisition_id + "recruiter_id= " + recruiter_id)
        console.log(requisition_id)
    }

    const items = [1, 2, 3];

    function PaginatedItems({ itemsPerPage }) {

        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const currentItems = items.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(items.length / itemsPerPage);

        const handlePageClick = (event) => {
            const newOffset = (event.selected * itemsPerPage) % items.length;
            console.log(
                `User requested page number ${event.selected}, which is offset ${newOffset}`
            );
            setItemOffset(newOffset);
        };

        return (
            <>
                <renderTable currentItems={currentItems} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={0}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </>
        );
    }

    const renderTable = () => {

        return statusList.map(st => {

            if (st.requisition.requisition_id == requisitionID && st.flag == 1 && (st.candidate == null || st.candidate.deleted == 1))
            
                return (

                    <tr key={st.status_id}>
                        <td></td>
                        <td>
                            {
                                st.candidate == null ?
                                    (
                                        <a href="/viewAllStatusAdmin" onClick={(evt) => getnewID({
                                            reqid: st.requisition.requisition_id,
                                            recid: st.recruiter.recruiter_id
                                        })}>All Status</a>
                                    ) :
                                    (
                                        <a href="/viewAllStatusAdmin" onClick={(evt) => getnewID({
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
                        <td>{st.status_date}</td>
                        <td>{st.recruiter.recruiter_name}</td>
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
                    </tr >
                );
        })
    }

    return (
        <div className="">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <AdminHeader />
                </div>

                <div className="col-12 master_backgroung_work scroll-bar-horizontal">

                    <div style={{ width: '' }}  >
                        <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Sr No.</th>
                                    <th style={{ width: '110px' }}>View All Status</th>
                                    <th style={{ width: '140px' }}>Candidate Name</th>
                                    <th style={{ width: '120px' }}>Current Status </th>
                                    <th style={{ width: '100px' }}>Date </th>
                                    <th style={{ width: '100px' }}>Recruiter Name</th>
                                    <th style={{ width: '50px' }}>Visa Type</th>
                                    <th style={{ width: '60px' }}>Rate term</th>
                                    <th style={{ width: '60px' }}>Client Rate</th>
                                    <th style={{ width: '20px' }}>Submitted Rate</th>
                                    <th style={{ width: '70px' }}>Phone</th>
                                    <th style={{ width: '130px' }}>Email</th>
                                    <th style={{ width: '100px' }}>Remark</th>
                                    <th style={{ width: '100px' }}>Reason</th>

                                    <th style={{ width: '115px' }}>Action</th>
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
export default ViewCandForAdmin;