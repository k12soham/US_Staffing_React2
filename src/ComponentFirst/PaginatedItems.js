import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import base_url from '../api/bootapi';
import { PaginationItem } from 'reactstrap';
/*

// let itemsPerPage =5;

// function PaginatedItems() {


function PaginatedItems() {

    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);


    // fetch("https://ihsavru.me/Demo/uploads.json")
    //   .then((res) => res.json())
    //       .then((data) => {
    //         const {
    //           course: { uploads }
    //         } = data;
    //         setData(uploads);
    //       });
    //   }

    useEffect(() => {
        axios.get(`${base_url}/getAllRequisition`).then(json => setRequisitionList(json.data))
    }, []);


    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    const currentPageData = data
        .slice(offset, offset + PER_PAGE)
        .map(({ thumburl }) => <img src={thumburl} />);
    const pageCount = Math.ceil(data.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    return (
        <div className="App">
            <h1>React Paginate Example</h1>
            <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
            {currentPageData}
        </div>
    );

}

export default PaginationItem
*/