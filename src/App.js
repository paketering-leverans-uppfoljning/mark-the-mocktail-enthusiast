import styles from "./App.module.css";
import { useEffect, useReducer, useState } from "react";
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";

function App() {
  const [mocktails, setMocktails] = useState([]);
  const [todoList, todoListDispatch] = useReducer(todoListReducer, []);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
      );
      const jsonResponse = await response.json();
      setMocktails(jsonResponse?.drinks);
    };
    fetchData();
  }, []);
  return (
    <div className={styles["container"]}>
      <h1 className={styles["header"]}>Mark's To-drink List</h1>
      <Searchbar mocktails={mocktails} dispatch={todoListDispatch} />
      <TodoList list={todoList} dispatch={todoListDispatch} />
    </div>
  );
}

let nextId = 0;
const todoListReducer = (list, action) => {
  switch (action.type) {
    case "add": {
      return [...list, { name: action.payload, completed: false, id: nextId++ }];
    }
    default: {
      throw Error(`Unknown action ${action.type}`);
    }
    case "complete": {
      return list.map((l) => {
        if (l.id === action.payload.id) {
          return {...l, completed: !l.completed };
        }
        return l;
      });
    }
  }
};

export default App;
