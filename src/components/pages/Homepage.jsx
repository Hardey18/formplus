import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { retrieveTemplate } from "../../slices/template";
import "./homepage.css";
import Card from "../Card";

const renderData = (data) => {
  return (
    <>
      {data.map(({ name, description }, index) => (
        <div key={index}>
          <Card name={name} description={description} />
        </div>
      ))}
    </>
  );
};

function HomePage() {
  const [search, setNewSearch] = useState("");
  const [categorySortType, setCategorySortType] = useState("");
  const [alphabeticSortType, setAlphabeticSortType] = useState("");
  const [dateSortType, setDateSortType] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(15);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const itemsPerPage = 15;
  const pageNumberLimit = 15;
  const data = useSelector((state) => state.templates);
  const dispatch = useDispatch();

  const initFetch = useCallback(() => {
    dispatch(retrieveTemplate());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const filtered = search
    ? data.filter((result) =>
        result.name.toLowerCase().includes(search.toLowerCase())
      )
    : categorySortType
    ? data.filter((result) =>
        result.category[0]
          .toLowerCase()
          .includes(categorySortType.toLowerCase())
      )
    : alphabeticSortType
    ? [...data].sort((a, b) => {
        const isReversed = alphabeticSortType === "asc" ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      })
    : dateSortType
    ? [...data].sort((a, b) => {
        const isReversed = dateSortType === "asc" ? 1 : -1;
        const firstDate = a.created;
        const secondDate = b.created;
        return isReversed * firstDate.localeCompare(secondDate);
      })
    : data;

  const pages = [];

  for (let i = 1; i <= Math.ceil(filtered.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const totalPage = Math.floor(filtered.length / itemsPerPage + 1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategorySortType(e.target.value);
  };

  const handleSortChange = (e) => {
    setAlphabeticSortType(e.target.value);
  };

  const handleDateSortChange = (e) => {
    setDateSortType(e.target.value);
  };

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
            <select onChange={handleCategoryChange}>
              <option value="">All</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="E-Commerce">E-Commerce</option>
              <option value="Government">Government</option>
            </select>
          </div>
          <div>
            <select onChange={handleSortChange}>
              <option value="">Default</option>
              <option value="asc">Ascending</option>
              <option value="des">Descending</option>
            </select>
          </div>
          <div>
            <select onChange={handleDateSortChange}>
              <option value="">Default</option>
              <option value="asc">Ascending</option>
              <option value="des">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <p className="category">{categorySortType || "All"} Templates</p>
      <div className="container">{renderData(currentItems)}</div>

      <div className="pageNumbers">
        <button onClick={handlePrevbtn} disabled={currentPage === pages[0]}>
          Previous
        </button>
        <div>
          <span className="currentPage">{currentPage}</span> of{" "}
          <span className="totalPage">{totalPage}</span>
        </div>
        <button
          onClick={handleNextbtn}
          disabled={currentPage === pages[pages.length - 1]}
        >
          Next
        </button>
      </div>
    </>
  );
}
export default HomePage;
