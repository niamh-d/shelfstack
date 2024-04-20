import { useShelves } from "../contexts/ShelvesContext";

import Navigation from "../components/Navigation";
import ShelvesFilterAndSort from "../components/ShelvesFilterAndSort";
import ShelvesGrid from "../components/ShelvesGrid";

const ExploreShelvesView = () => {
  const { displayedAppsShelves } = useShelves();

  return (
    <div>
      <Navigation />
      <div id="ExploreShelves">
        <h2 className="page-title">Explore Shelves!</h2>
      <ShelvesFilterAndSort arrayType="app" />
      <ShelvesGrid shelves={displayedAppsShelves} />
      </div>
    </div>
  );
};

export default ExploreShelvesView;
