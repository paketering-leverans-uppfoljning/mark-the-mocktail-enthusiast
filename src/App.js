import styles from "./App.module.css";
import { useEffect, useState } from "react";
import Searchbar from "./components/Searchbar";

function App() {
  const [mocktails, setMocktails] = useState([]);
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
      <Searchbar mocktails={mocktails} />
    </div>
  );
}

export default App;
