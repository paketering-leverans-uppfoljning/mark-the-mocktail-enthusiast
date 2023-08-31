import styles from "./App.module.css";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <div className={styles["container"]}>
      <h1 className={styles["header"]}>Mark's To-drink List</h1>
      <Searchbar />
    </div>
  );
}

export default App;
