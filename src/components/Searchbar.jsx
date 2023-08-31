import styles from "./Searchbar.module.css";
import { useState } from "react";

function Searchbar() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <input
      className={styles["searchbar"]}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}

export default Searchbar;
