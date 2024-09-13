import styles from "./Filter.module.css";

function Filter({ filter, updateFilter }) {
  return (
    <div className={`${styles["container"]} component`}>
      <button
        className={`${
          filter.name === "allFilter" ? styles["selected"] : ""
        } ${styles["filter-button"]}`}
        onClick={() => updateFilter(() => allFilter)}
      >
        All
      </button>
      <button
        className={`${
          filter.name === "activeFilter" ? styles["selected"] : ""
        } ${styles["filter-button"]}`}
        onClick={() => updateFilter(() => activeFilter)}
      >
        Active
      </button>
      <button
        className={`${
          filter.name === "completedFilter" ? styles["selected"] : ""
        } ${styles["filter-button"]}`}
        onClick={() => updateFilter(() => completedFilter)}
      >
        Completed
      </button>
    </div>
  );
}

const allFilter = (drink) => drink;
const activeFilter = (drink) => !drink.completed;
const completedFilter = (drink) => drink.completed;

export default Filter;
