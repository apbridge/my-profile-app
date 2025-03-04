import Card from "../components/Card";
import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useReducer } from "react";
import styles from "../styles/home.module.css";
import { Link } from "react-router-dom";
import {initialState, homeReducer} from "../reducers/homeReducer";

const HomePage = () => {
  //const [titles, setTitles] = useState([]);
  //const [title, setTitle] = useState("");
  //const [search, setSearch] = useState("");
  //const [profiles, setProfiles] = useState([]);
  //const [page, setPage] = useState(1);
  //const [count, setCount] = useState(1);
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const {titles, title, search, profiles, page, count} = state;

  // get titles
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~apbridge/profile-app/get-titles.php")
      .then((res) => res.json())
      .then((data) => {
        //setTitles(data.titles);
        dispatch({type: "SET_TITLES", payload: data.titles});
      });
  }, []);

  //update the title on change of the drowndrop
  const handleTitleChange = (event) => {
    //setTitle(event.target.value);
    //setPage(1);
    dispatch({type: "SET_TITLE", payload: event.target.value});
  };

  //update the search on change of the input
  const handleSearchChange = (event) => {
    // setSearch(event.target.value);
    // setPage(1);
    dispatch({type: "SET_SEARCH", payload: event.target.value});
  };
  //fetch the data from the server
  useEffect(() => {
    fetch(
      `https://web.ics.purdue.edu/~apbridge/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        // setProfiles(data.profiles);
        // setCount(data.count);
        // setPage(data.page);
        dispatch({type: "FETCH_DATA", payload: data});
      });
  }, [title, search, page]);
  //clear the title and search
  const handleClear = () => {
    // setTitle("");
    // setSearch("");
    // setPage(1);
    dispatch({type: "CLEAR_FILTERS"});
  };

  const buttonStyle = {
    border: "1px solid #ccc",
  };

  return (
    <Wrapper>
      <h1>Profile App</h1>
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
      <div className={styles["profile-cards"]}>
        {profiles.map((profile) => (
          <Link to={`/profile/${profile.id}`} key={profile.id}>
          <Card key={profile.id} {...profile} />
          </Link>
        ))}
      </div>
      {count === 0 && <p>No profiles found!</p>}
      {count > 10 && (
        <div className={styles["pagination"]}>
          <button onClick={() => dispatch({type: "SET_PAGE", payload: page - 1})} disabled={page === 1}>
            <span className="sr-only">Previous</span>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <span>
            {page}/{Math.ceil(count / 10)}
          </span>
          <button
            onClick={() => dispatch({type: "SET_PAGE", payload: page + 1})}
            disabled={page >= Math.ceil(count / 10)}
          >
            <span className="sr-only">Next</span>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </Wrapper>
  );
};

export default HomePage;