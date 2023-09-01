import { isEmpty } from "lodash";
import styles from "./TodoList.module.css";
import cross from "../assets/icon-cross.svg";

/**
 * The todo list. Can delete and mark drinks as complete via dispatch.
 */

function TodoList({ list, dispatch, filterFn }) {
  const drinks = list.filter(filterFn).map((drink) => (
    <li
      className={`${styles["list-item"]} ${
        drink.completed ? styles["crossed-over"] : ""
      }`}
      key={drink.id}
    >
      <span
        className={styles["drink-name"]}
        onClick={() =>
          dispatch({ type: "complete", payload: { id: drink.id } })
        }
      >
        {drink.name}
      </span>
      <input
        type="image"
        src={cross}
        alt="remove button"
        onClick={() => dispatch({ type: "delete", payload: { id: drink.id } })}
      />
    </li>
  ));
  if (isEmpty(drinks)) {
    return null;
  }
  return <ul className="component">{drinks}</ul>;
}
export default TodoList;
