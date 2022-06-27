import React from "react";

import lodash from "lodash";

import styles from "./Search.module.css";

export default function Search({ onHandleInput }) {
  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.content}>
        <h1>Start images search from here:</h1>
        <form className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search images..."
            onInput={lodash.debounce(onHandleInput, 800)}
          />
        </form>
      </div>
    </div>
  );
}
