/* eslint-disable react/prop-types */
import Shelf from "./Shelf";

const ShelvesGrid = ({ shelves }) => {
  return (
    <div>
      {shelves && (
        <div className="shelves">
          {shelves.map((shelf) => (
            <Shelf shelf={shelf} key={shelf.shelfId} />
          ))}
        </div>
      )}
      {(!shelves || shelves.length === 0) && (
        <h2>No shelves match your selected criteria.</h2>
      )}
    </div>
  );
};

export default ShelvesGrid;
