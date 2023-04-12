import { React, useState, useEffect } from "react";
import axios from "axios";
import base_url from "../api/bootapi";
import { Table } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import history from './ResponseVal';

let PageSize = 10;

function ViewReqForAdmin() {


    const [requisitionList, setRequisitionList] = useState([]);
    const [statusList, setstatusList] = useState([]);
    const [statusFD, setstatusFD] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    let navigate = useNavigate();


    // ---------------------------Pagination-------------------------------------------------------------
    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
        axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    const deleteBook = (requisitionID) => {
        console.log(requisitionID);
        axios.delete(`${base_url}/deleteRequisitionByAdmin?requisition_id=${requisitionID}`)
            .then(response => {

                toast.success("Record deleted successfully!", {
                    position: "top-right",
                    autoClose: 1000,
                    style: { position: "absolute", top: "5px", width: "300px" }
                });

                axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
            },
                (error) => {
                    console.log(error);
                });
    }

    const onEdit = ({ requisitionID }) => {

        localStorage.setItem('requisitionID', requisitionID);

        navigate("/updateRequisitionAdmin");

    }

    const getnewID = (e) => {
       
        let requisitionID = e.rq
        let req = e.req
        localStorage.setItem("requisitionID", requisitionID)
        localStorage.setItem("reqID", req)
    
    }

    const renderTable = () => {
        const isAuthenticated = localStorage.getItem('recruiterRole');


        return isAuthenticated =="Admin"? (
   

            requisitionList.filter((cls) => {

                if (searchTerm === "") {
                    return cls;
                }
                else if (cls.requisition_from.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.client.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.job_title.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                } else if (cls.duration.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.client_rate.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.location.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                } else if (cls.position_type.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return cls;
                }
                else if (cls.skills.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                }
                else if (cls.id.toString().toLowerCase().includes(searchTerm.toString().toLowerCase())) {
                    return cls;
                }


            }
            ).map(cls => {
                if (cls.deleted == 1) {
                    return (
                        <tr key={cls.requisition_id}>
                            <td></td>
                            <td hidden>{cls.requisition_id}</td>
                            <td>{cls.requisition_from}</td>

                            <td>{
                                <a href="/viewCandForAdmin" onClick={(evt) => getnewID({ rq: cls.requisition_id, req:cls.id })}>{cls.id}</a>

                            }</td>
                            <td>{cls.client}</td>
                            <td>{cls.job_title}</td>
                            <td>{cls.duration}</td>
                            <td>{cls.client_rate}</td>
                            <td>{cls.location}</td>
                            <td>{cls.position_type}</td>
                            <td>{cls.skills}</td>
                            <td>
                                &nbsp;&nbsp;
                                <button
                                    style={{ marginRight: '3px' }}
                                    className="btn btn-sm btn-outline-success"
                                    onClick={() => onEdit({
                                        requisitionID: cls.requisition_id,
                                    })}
                                >
                                    <i class="fa fa-edit"></i>
                                </button>
                                &nbsp;&nbsp;

                                <button className="btn btn-sm btn-outline-danger"
                                    onClick={() => {
                                        if (window.confirm('Are you sure to delete this requirement?'))
                                            deleteBook(cls.requisition_id)
                                    }}>
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr >

                    )
                }

            })
        ) : (
            history.push("/"),
            window.location.reload()
        );

    }

    return (
        // return (
        <div className="">
            <div className="row">

                <div className="col-12 h-100 master_backgroung_heder">
                    <AdminHeader />
                </div>

                <div className="col-12 master_backgroung_work scroll-bar-horizontal" >

                    {/* -------------------------------------------------------- */}
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

                    <div style={{ width: '' }}  >

                        <Table className="table table-sm table-striped table-bordered" style={{ fontFamily: 'arial', fontSize: '14px' }}>
                            <thead>
                                <tr>
                                    <th style={{ width: '60px' }}>Sr No.</th>
                                    <th style={{ width: '120px' }}>Requisition From</th>
                                    <th style={{ width: '90px' }}>ID</th>
                                    <th style={{ width: '100px' }}>Client</th>
                                    <th style={{ width: '130px' }}>Job Title</th>
                                    <th style={{ width: '70px' }}>Duration</th>
                                    <th style={{ width: '50px' }}>Client Rate</th>
                                    <th style={{ width: '80px' }}>Location</th>
                                    <th style={{ width: '90px' }}>Position Type</th>
                                    <th style={{ width: '100px' }}>Skills</th>
                                    <th style={{ width: '70px' }}>Action</th>

                                </tr>
                            </thead>
                            <tbody>

                                {renderTable()}

                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>

            {/* // ********************************************** add script code**************************** */}

            <div className="application">

                {/* <Helmet>
                    <meta charSet="utf-8" />
                    <title>My Title</title>
                    <link rel="canonical" href="http://example.com/example" />
                    <script src="/path/to/resource.js" type="text/javascript" />
                    <script>alert('Hello world')</script>

                    <script>
                        $(function () {
                            $("#example1").DataTable({
                                "responsive": true, "lengthChange": false, "autoWidth": false,
                                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                            }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
                        $('#example2').DataTable({
                            "paging": true,
                        "lengthChange": false,
                        "searching": false,
                        "ordering": true,
                        "info": true,
                        "autoWidth": false,
                        "responsive": true,
    });
  });
                    </script> 
                </Helmet>*/}
            </div>
        </div>


        //)

       
        );
   
}
export default ViewReqForAdmin;