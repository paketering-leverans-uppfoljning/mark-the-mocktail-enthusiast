import styles from "./Searchbar.module.css";
import { useState, useRef } from "react";
import { isEmpty, isEqual } from "lodash";
import LoadingSpinner from "./LoadingSpinner";

//If app gets more complex, context may be needed for handling of mocktails
/**
 * Searchbar used for searching drinks to add into db.
 * (The accesibility of this component is simplified for the matter of this exercise.
 * A real world example would use a combobox.)
 */
// TODO: refactor so arrow keys can be used
function Searchbar({ mocktails, dispatch }) {
  const [searchQuery, setSearchQuery] = useState("");
  //makes sure the input is focused after submission via click
  const ref = useRef(null);

  if (isEmpty(mocktails)) {
    return <LoadingSpinner />;
  }
  const filteredMocktails = getSearchResults(mocktails, searchQuery).map(
    (mocktail) => (
      <li
        key={mocktail}
        className={styles["search-result"]}
        onClick={(e) => {
          setSearchQuery("");
          dispatch({ type: "add", payload: e.target.textContent });
          ref.current.focus();
        }}
      >
        {mocktail}
      </li>
    )
  );
  return (
    <form
      className={styles["container"]}
      onSubmit={(e) => {
        handleSubmit(
          e,
          dispatch,
          setSearchQuery,
          getSearchResults(mocktails, searchQuery)
        );
      }}
    >
      <input
        ref={ref}
        className={styles["searchbar"]}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={"Search for a drink.."}
      />
      <ul className={styles["search-results"]}>{filteredMocktails}</ul>
    </form>
  );
}

/**
 * Gets substring matches from a given mocktail-list and searchquery
 */
//NOTE: I chose not to unit test this function as I think the integration tests
// gave me enough confidence.
// may use useCallback() for optimisation due this occuring in submission as well
const getSearchResults = (mocktails, searchQuery) => {
  if (!searchQuery) {
    return [];
  }
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

const handleSubmit = (e, dispatch, setSearchQuery, searchResults) => {
  e.preventDefault();
  if (isEqual(["No results found."], searchResults) || isEmpty(searchResults)) {
    return;
  }
  //autocompletes to submit the first item in the suggestions.
  dispatch({ type: "add", payload: searchResults[0] });
  setSearchQuery("");
};

export default Searchbar;
