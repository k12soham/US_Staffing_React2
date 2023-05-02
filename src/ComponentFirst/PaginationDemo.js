import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css';
import base_url from "../api/bootapi";
import axios from "axios";

const Pagination = () => {


    const [requisitionList, setRequisitionList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);

    const PER_PAGE = 2;
    const offset = currentPage * PER_PAGE;
    const currentPageData = requisitionList
        .slice(offset, offset + PER_PAGE)
        .map(({ thumburl }) => <img src={thumburl} />);
    const pageCount = Math.ceil(requisitionList.length / PER_PAGE);

    // const currentItems = items.slice(itemOffset, endOffset);


    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
        // axios.get(`${base_url}/getEmpList_TM`).then(json => setEmployee(json.data))
        // axios.get(`${base_url}/getAllStatus`).then(json => setstatusList(json.data))
        // axios.get(`${base_url}/getAllStatusFd`).then(json => setstatusFD(json.data))

    }, []);

    // const pageCount = Math.ceil(requisitionList.length / itemsPerPage);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);

    }

    const render = () => {
        return (
            <div className='container'>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>User_Id</th>
                            <th>User_Name</th>
                            <th>Email</th>
                            <th>Profile Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((card) => {

                           
                            return (
                                <tr>
                                    <td>{card.requisition_id}</td>
                                    <td>{card.client}</td>
                                    <td>{card.location}</td>
                                    <td><button className="btn btn-outline-primary ml-2 my-2 my-sm-0">Edit</button></td>
                                    <td><button className="btn btn-outline-primary ml-2 my-2 my-sm-0">Delete</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />

{currentPageData}
            </div>

        )

    };

    return (
        <div>
            {/* <p>welcome!</p> */}
            {render()}
        </div>
    )
};

export default Pagination;