import './App.css';
import { useState, useEffect } from "react";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import ProfileForm from "./components/ProfileForm";

const App = () => {
  // State to store profiles
  const [profiles, setProfiles] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(1);
  const limit = 10;
  //const [animation, setAnimation] = useState(false);

  // Fetch profiles when the component mounts
  useEffect(() => {
    fetch(`https://web.ics.purdue.edu/~apbridge/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&page=${page}&limit=10`)
      .then(res => res.json())
      .then((data) => {
        setProfiles(data.profiles);
        setCount(data.count);
        setPage(data.page);
      });
  }, [title,search,page]);

  // Extract unique titles
 // const titles = [...new Set(profiles.map((profile) => profile.title))];
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    fetch("https://web.ics.purdue.edu/~apbridge/profile-app/get-titles.php")
    .then((res) => res.json())
    .then((data) => {
      setTitles(data.titles)
    })
  }, []);

  // Update title when dropdown changes
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setPage(1);
    //setAnimation(true);
  };

  // Update search query
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(1);
    //setAnimation(true);
  };

  // Clear filters
  const handleClear = () => {
    setTitle("");
    setSearch("");
    setPage(1);
    //setAnimation(true);
  };

  // Filter profiles based on title and search query
  //const filteredProfiles = profiles.filter((profile) => 
   // (title === "" || profile.title === title) &&
    //profile.name.toLowerCase().includes(search.toLowerCase())
  //);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Wrapper>
          <h1>Profile App</h1>
        </Wrapper>
        <Wrapper>
          <About />
        </Wrapper>
        <Wrapper>
          <ProfileForm />
        </Wrapper>
        <Wrapper>
          <div className="filter-wrapper">
            <div className="filter--select">
              <label htmlFor="title-select">Select a title: </label>
              <select id="title-select" onChange={handleTitleChange} value={title}>
                <option value="">All</option>
                {titles.map((title) => (
                  <option key={title} value={title}>{title}</option>
                ))}
              </select>
            </div>
            <div className="filter--search">
              <label htmlFor="search">Search by name: </label>
              <input type="text" id="search" onChange={handleSearchChange} value={search}/>
            </div>
            <button onClick={handleClear} style={{ border: "1px solid #ccc" }}>Clear</button>
          </div>

          <div className="profile-cards">
            {profiles.map((profile) => (
              <Card 
                key={profile.id} 
                {...profile} 
              />
            ))}
          </div>
          {count === 0 && <p>No profiles found!</p>}
          {count > 10 &&
          <div className="pagination">
            <button onClick={() => setPage(page-1)} disabled={page === 1}>Previous</button>
            <span>{page}/{Math.ceil(count/limit)}</span>
            <button onClick={() => setPage(page+1)} disabled={page >= Math.ceil(count/limit)}>Next</button>
          </div>
          }
        </Wrapper>
      </main>
    </>
  );
};

export default App;
