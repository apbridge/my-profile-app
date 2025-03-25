import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/home.module.css";
import {useRef, useEffect, memo} from "react";

const Filter = memo(({titles, title, search, handleTitleChange, handleSearchChange, handleClear}) => {
    const buttonStyle = {
        border: "1px solid #ccc",
      };
    const renderCounter = useRef(0);
    useEffect(() => {
        renderCounter.current = renderCounter.current + 1;
        console.log("Filter rendered", renderCounter.current);
    });
    return (
        <div className={styles["filter-wrapper"]}>
        <div className={styles["filter--select"]}>
          <label htmlFor="title-select">Select a title:</label>
          <select id="title-select" onChange={handleTitleChange} value={title}>
            <option value="">All</option>
            {titles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </div>
        <div className={styles["filter--search"]}>
          <label htmlFor="search">Search by name:</label>
          <input
            type="text"
            id="search"
            onChange={handleSearchChange}
            value={search}
          />
        </div>
        <button onClick={handleClear} style={buttonStyle}>
          <span className="sr-only">Reset</span>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    );
});
export default Filter;