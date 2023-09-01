import styles from "./Searchbar.module.css";
import { useState } from "react";
import { isEmpty } from "lodash";
import LoadingSpinner from "./LoadingSpinner";

//If app gets more complex, context may be needed for handling of mocktails
/**
 * Searchbar used for searching drinks to add into db.
 * (The accesibility of this component is simplified for the matter of this exercise.
 * A real world example would use a combobox.)
 */
// TODO: refactor so arrow keys can be used
function Searchbar({ mocktails }) {
  const [searchQuery, setSearchQuery] = useState("");

  if (isEmpty(mocktails)) {
    return <LoadingSpinner />;
  }
  const filteredMocktails = getSearchResults(mocktails, searchQuery).map(
    (mocktail) => (
      <li
        key={mocktail}
        className={styles["search-result"]}
        onClick={(e) => setSearchQuery(e.target.textContent)}
      >
        {mocktail}
      </li>
    )
  );
  return (
    <div className={styles["container"]}>
      <input
        className={styles["searchbar"]}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={"Search for a drink.."}
      />
      {searchQuery && (
        <ul className={styles["search-results"]}>{filteredMocktails}</ul>
      )}
    </div>
  );
}

/**
 * Gets substring matches from a given mocktail-list and searchquery
 */
//NOTE: I chose not to unit test this function as I think the integration tests
// gave me enough confidence.
const getSearchResults = (mocktails, searchQuery) => {
  const searchResults = mocktails
    .filter((mocktail) =>
      mocktail.strDrink.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((mocktail) => mocktail.strDrink)
    .slice(0, 5);
  //makes the box disappear if user found the drink they searched for
  if (searchResults.length === 1 && searchResults[0] === searchQuery) {
    return [];
  }
  if (isEmpty(searchResults)) {
    return ["No results found."];
  }
  return searchResults;
};

export default Searchbar;
