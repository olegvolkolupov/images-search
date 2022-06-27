import React from "react";
import styles from "./Button.module.css";

export default function Button({action}) {
  return (
    <div className={styles.container}>
      <button className={styles.button} type="button" onClick={action}>
        Load more
      </button>
    </div>
  );
}
