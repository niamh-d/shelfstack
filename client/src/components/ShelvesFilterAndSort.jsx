/* eslint-disable react/prop-types */
import { useState } from "react";

import FilterAndSortShelvesForm from "./FilterAndSortShelvesForm";

import { useShelves } from "../contexts/ShelvesContext";

const ShelvesFilterAndSort = ({ arrayType }) => {
  const { categoriesArray, filterAndSortShelves } = useShelves();

  const initialState = {
    category: "all",
    sort: "rate-desc",
  };

  const [selectedFilterAndSortCriteria, setSelectedFilterAndSortCriteria] =
    useState(initialState);

  const resetHandler = () => {
    setSelectedFilterAndSortCriteria(initialState);
    filterAndSortShelves(initialState, arrayType);
  };

  const onChangeHandler = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    setSelectedFilterAndSortCriteria((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const onFilterAndSortHandler = (e) => {
    e.preventDefault();
    filterAndSortShelves(selectedFilterAndSortCriteria, arrayType);
  };

  return (
    <FilterAndSortShelvesForm
      categories={categoriesArray}
      filterAndSortHandler={onFilterAndSortHandler}
      changeHandler={onChangeHandler}
      resetHandler={resetHandler}
    />
  );
};

export default ShelvesFilterAndSort;
