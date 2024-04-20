export function renderItemsObjs(array) {
  const items = array.map((item) => {
    return {
      itemId: item.item_id,
      url: item.url,
      shelfId: item.shelf_id,
      preview: {
        description: item.description,
        siteName: item.site_name,
        title: item.title,
        image: item.image,
      },
    };
  });
  return items;
}

function calculateRating(totalRatingCount, numVoters) {
  const rating = Math.round(totalRatingCount / numVoters, 0);
  return isNaN(rating) ? null : rating;
}

// convert shelf objects from snake case to camel case
export function convertShelfObjectNames(array) {
  const shelves = array.map((shelf) => {
    const rating = calculateRating(shelf.count_rating, shelf.num_voters);
    return {
      shelfId: shelf.shelf_id,
      userId: shelf.user_id,
      shelfName: shelf.shelf_name,
      shelfDescription: shelf.shelf_description,
      numVoters: shelf.num_voters,
      isPublic: shelf.is_public,
      rating,
      shelfAddDate: shelf.shelf_add_date,
      category: shelf.category,
    };
  });

  return shelves;
}

export function filterShelvesForSelectedCategory(array, category) {
  return array.filter((shelf) => shelf.category === category);
}

export function sortShelves(array, sortType) {
  switch (sortType) {
    case "rate-desc":
      return array.sort((a, b) => b.rating - a.rating);
    case "rate-asc":
      return array.sort((a, b) => a.rating - b.rating);
    case "votes-desc":
      return array.sort((a, b) => b.numVoters - a.numVoters);
    case "votes-asc":
      return array.sort((a, b) => a.numVoters - b.numVoters);
    case "newest":
      return array.sort((a, b) => b.shelfId - a.shelfId);
    case "oldest":
      return array.sort((a, b) => a.shelfId - b.shelfId);
    case "alpha":
      return alphabeticSort(array);
    case "reverse":
      return alphabeticSort(array, true);
  }
}

function alphabeticSort(array, reverse = false) {
  return array.sort((a, b) => {
    const nameA = a.shelfName.toUpperCase(); // ignore upper and lowercase
    const nameB = b.shelfName.toUpperCase(); // ignore upper and lowercase

    if (reverse) {
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
    } else {
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    }

    // names must be equal
    return 0;
  });
}
