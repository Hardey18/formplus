import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import { retrieveTemplate } from "../../slices/template";
import "./homepage.css";
import Card from "../Card";

function Homepage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setNewSearch] = useState("");
  const [categorySortType, setCategorySortType] = useState("");
  const [alphabeticSortType, setAlphabeticSortType] = useState("");
  const [dateSortType, setDateSortType] = useState("");

  const templates = useSelector((state) => state.templates);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveTemplate());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const PER_PAGE = 15;
  const offset = currentPage * PER_PAGE;

  const filtered = search
    ? templates.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase())
      )
    : categorySortType
    ? templates.filter((result) =>
        result.category[0]
          .toLowerCase()
          .includes(categorySortType.toLowerCase())
      )
    : alphabeticSortType
    ? [...templates].sort((a, b) => {
        const isReversed = alphabeticSortType === "asc" ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      })
    : dateSortType
    ? [...templates].sort((a, b) => {
        const isReversed = dateSortType === "asc" ? 1 : -1;
        const firstDate = a.created;
        const secondDate = b.created;
        return isReversed * firstDate.localeCompare(secondDate);
      })
    : templates;

  const currentPageData = filtered
    .slice(offset, offset + PER_PAGE)
    .map(({ name, description }, index) => (
      <div key={index}>
        <Card name={name} description={description} />
      </div>
    ));

  const pageCount = Math.ceil(filtered.length / PER_PAGE);

  function handlePageClick({ selected: selectedPage }) {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setCurrentPage(selectedPage);
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const handleMassChange = (e) => {
    setCategorySortType(e.target.value);
  };

  const handleSort = (e) => {
    setAlphabeticSortType(e.target.value);
  };

  const handleDateSort = (e) => {
    setDateSortType(e.target.value);
  };
  console.log("Length of Data", pageCount);
  return (
    <>
      <div className="inputContainers">
        <input
          className="search"
          placeholder="Search Templates"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />

        <div className="filterInput">
          <div>Sort By:</div>
          <div>
            <select onChange={handleMassChange}>
              <option value="">All</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div>
            <select onChange={handleSort}>
              <option value="">Default</option>
              <option value="asc">Ascending</option>
              <option value="des">Descending</option>
            </select>
          </div>
          <div>
            <select onChange={handleDateSort}>
              <option value="">Default</option>
              <option value="asc">Ascending</option>
              <option value="des">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <p className="category">{categorySortType || "All"} Templates</p>
      <div className="container">{currentPageData}</div>
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
    </>
  );
}

export default Homepage;
