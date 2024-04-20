/* eslint-disable react/prop-types */
const FilterAndSortShelvesForm = ({
  categories,
  changeHandler,
  filterAndSortHandler,
  resetHandler,
}) => {
  return (
    <form onSubmit={filterAndSortHandler} id="filter">
      <div>
        <div>
          <label htmlFor="category">Filter for category</label>
          <br />
          <select onChange={changeHandler} id="category">
            <option value="all">All (no filter)</option>
            {categories.sort().map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort">Sort by:</label>
          <br />
          <select onChange={changeHandler} id="sort">
            <option value="rate-desc">Rating descending</option>
            <option value="rate-asc">Rating ascending</option>
            <option value="votes-desc">No. votes descending</option>
            <option value="votes-asc">No. votes ascending</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="alpha">Alphabetic</option>
            <option value="reverse">Reverse Alphabetic</option>
          </select>
        </div>
      </div>
      <div className="buttons">
        <button type="submit" onClick={filterAndSortHandler}>
          Submit
        </button>
        <button id="secondary" type="button" onClick={resetHandler}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default FilterAndSortShelvesForm;
