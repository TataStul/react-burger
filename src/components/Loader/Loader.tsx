import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.grid}>
      <div className={styles.loader}></div>
    </div>
  );
}
