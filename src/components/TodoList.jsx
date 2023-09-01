import { isEmpty } from "lodash";
import styles from "./TodoList.module.css";
import cross from "../assets/icon-cross.svg";

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
    >
      <span
        className={styles["drink-name"]}
        onClick={() =>
          dispatch({ type: "complete", payload: { id: drink.id } })
        }
      >
        {drink.name}
      </span>{" "}
      <input
        type="image"
        src={cross}
        alt="remove button"
        onClick={() =>
          dispatch({ type: "delete", payload: { id: drink.id } })
        }
      />
    </li>
  ));
  return <ul className={styles["container"]}>{drinks}</ul>;
}

export default TodoList;
