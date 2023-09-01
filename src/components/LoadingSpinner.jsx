import styles from "./LoadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={styles["container"]}>
      <div data-testid="loading-spinner" className={styles["spinner"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      Loading..
    </div>
  );
}

export default LoadingSpinner;
