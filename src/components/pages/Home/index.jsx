import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { retrieveTemplate } from "../../../slices/template";
import "./style.css";
import Card from "../../sections/Card";
import Pagination from "../../sections/Pagination";
import Sorting from "../../sections/Sorting";
import InputSearch from "../../sections/InputSearch";

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
        const isReversed = alphabeticSortType === "Ascending" ? 1 : -1;
        return isReversed * a.name.localeCompare(b.name);
      })
    : dateSortType
    ? [...data].sort((a, b) => {
        const isReversed = dateSortType === "Ascending" ? 1 : -1;
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setcurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  const handlePrevbtn = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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

  const categoriesData = data.map((result) => {
    return result.category;
  });

  const uniqueCategories = [...new Set([].concat(...categoriesData))];

  const sortValues = ["Ascending", "Descending"];

  return (
    <>
      <div className="inputContainers">
        <InputSearch
          className="search"
          placeholder="Search Templates"
          type="text"
          value={search}
          handleChange={handleSearchChange}
        />

        <div className="filterInput">
          <div>Sort By:</div>
          <Sorting
            handleChange={handleCategoryChange}
            data={uniqueCategories}
          />
          <Sorting handleChange={handleSortChange} data={sortValues} />
          <Sorting handleChange={handleDateSortChange} data={sortValues} />
        </div>
      </div>

      <p className="category">{categorySortType || "All"} Templates</p>
      <div className="container">{renderData(currentItems)}</div>

      <Pagination
        currentPage={currentPage}
        handleNextbtn={handleNextbtn}
        handlePrevbtn={handlePrevbtn}
        pages={pages}
        totalPage={totalPage}
      />
    </>
  );
}
export default HomePage;
