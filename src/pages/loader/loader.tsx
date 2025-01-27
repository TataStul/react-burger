import styles from "./loader.module.css";

export function LoaderPage() {
  return (
    <div className={styles.grid}>
      <div className={styles.loader}></div>
    </div>
  );
}
