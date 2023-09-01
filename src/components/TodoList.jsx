import { isEmpty } from "lodash";
import styles from "./TodoList.module.css";

function TodoList({ list, dispatch }) {
  if (isEmpty(list)) {
    return null;
  }
  const drinks = list.map((drink) => (
    <li
      className={`${styles["list-item"]} ${
        drink.completed ? styles["crossed-over"] : ""
      }`}
      key={drink.id}
      onClick={() => dispatch({ type: "complete", payload: { id: drink.id } })}
    >
      {drink.name}
    </li>
  ));
  return <ul className={styles["container"]}>{drinks}</ul>;
}

export default TodoList;
