import styles from "./App.module.css";
import { useEffect, useReducer, useState } from "react";
import Searchbar from "./components/Searchbar";
import TodoList from "./components/TodoList";
import Filter from "./components/Filter";

function App() {
  const [mocktails, setMocktails] = useState([]);
  const [todoList, todoListDispatch] = useReducer(
    todoListReducer,
    initialDrinks
  );
  const [activeFilter, setActiveFilter] = useState(() => (drink) => drink); //returns a 1 to 1 function

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
      <Filter filter={activeFilter} updateFilter={setActiveFilter} />
      <TodoList
        list={todoList}
        dispatch={todoListDispatch}
        filterFn={activeFilter}
      />
    </div>
  );
}

const initialDrinks = [
  { name: "Apple Berry Smoothie", id: 0, completed: false },
  { name: "Banana Milkshake", id: 1, completed: false },
];

let nextId = 3;
const todoListReducer = (list, action) => {
  switch (action.type) {
    case "add": {
      return [
        ...list,
        { name: action.payload, completed: false, id: nextId++ },
      ];
    }
    default: {
      throw Error(`Unknown action ${action.type}`);
    }
    case "complete": {
      return list.map((l) => {
        if (l.id === action.payload.id) {
          return { ...l, completed: !l.completed };
        }
        return l;
      });
    }
    case "delete": {
      return list.filter((l) => l.id !== action.payload.id);
    }
  }
};

export default App;
