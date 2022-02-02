import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { retrieveTemplate } from "../../slices/template";
import "./homepage.css";
import Card from "../Card";

function Homepage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setNewSearch] = useState("");
  const [mass, setMass] = useState("");
  const [sortType, setSorted] = useState("");
  const [dateSort, setDateSort] = useState("");

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

  // const filtered = !search
  //   ? templates
  //   : templates.filter((result) =>
  //       result.name.toLowerCase().includes(search.toLowerCase())
  //     );

  const filtered = search
    ? templates.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase())
      )
    : mass
    ? templates.filter((result) =>
        result.category[0].toLowerCase().includes(mass.toLowerCase())
      )
    : sortType
    ? [...templates].sort((a, b) => {
        const isReversed = sortType === "asc" ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      })
    : dateSort
    ? [...templates].sort((a, b) => {
        const isReversed = dateSort === "asc" ? 1 : -1;
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
    setCurrentPage(selectedPage);
  }

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };

  const handleMassChange = (e) => {
    setMass(e.target.value);
  };

  const handleSort = (e) => {
    setSorted(e.target.value);
  };

  const handleDateSort = (e) => {
    setDateSort(e.target.value);
  };
  console.log("results", templates);
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
          <select onChange={handleMassChange}>
            <option value="">All</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="Government">Government</option>
          </select>
          <select onChange={handleSort}>
            <option value="">Default</option>
            <option value="asc">Ascending</option>
            <option value="des">Descending</option>
          </select>
          <select onChange={handleDateSort}>
            <option value="">Default</option>
            <option value="asc">Ascending</option>
            <option value="des">Descending</option>
          </select>
        </div>
      </div>
      <p className="category">{mass || "All"} Templates</p>
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
