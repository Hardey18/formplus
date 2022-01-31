import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { retrieveTemplate } from '../../slices/template'
import './homepage.css'
import Card from '../Card';

function Homepage() {
    const [currentPage, setCurrentPage] = useState(0);

  const templates = useSelector(state => state.templates);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveTemplate());
  }, [dispatch])

  useEffect(() => {
    initFetch()
  }, [initFetch])
  const PER_PAGE = 5;
  const offset = currentPage * PER_PAGE;

  const currentPageData = templates
    .slice(offset, offset + PER_PAGE)
    .map(({ name }) => (<>
        {/* <p>{name}</p> */}
        <Card 
          name={name}
        />
    </>));

    const pageCount = Math.ceil(templates.length / PER_PAGE);

    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
    }
  return (<>
    <h1>Hello</h1>
      {currentPageData}
      <ReactPaginate
        previousLabel={"< Previous"}
        nextLabel={"Next >"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>);
}

export default Homepage;
