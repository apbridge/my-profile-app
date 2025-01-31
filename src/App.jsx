
import './App.css';
import About from "./components/About";
import NavBar from "./components/NavBar";
import image_man from "./assets/headshot-woman.png";
import image_woman from "./assets/headshot-woman2.png";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import {useState} from "react";

const App = () => {
  const profiles =[
    {
      img: image_man,
      name:'John Doe',
      title:'Software Engineer', 
      email:'a@a.com'
    },
    {
      img: image_woman,
      name:'Lily Smith',
      title:'Software Engineer',
      email:'b@a.com'
    },
    {
      img: image_man,
      name:'Bob Johnson',
      title:'Web Developer', 
      email:'c@a.com'
    },
    {
      img: image_woman,
      name:'Ava Smith',
      title:'Web Developer',
      email:'d@a.com'
    },
    {
      img: image_man,
      name:'Tom Smith',
      title:'Software Engineer', 
      email:'e@a.com'
    },
    {
      img: image_woman,
      name:'Eva Smith',
      title:'Graphic Designer',
      email:'f@a.com'
    },
  ];
  // variable to store the animation state
  const [animation, setAnimation] = useState(false);
  //function to update the animation state
  const handleAnimation = () => {
    setAnimation(false);
  }
  // get titles 
  const titles = [...new Set(profiles.map((profile) => profile.title))]

  const [title, setTitle] = useState("");
  //update the title on change of the dropdown
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
    console.log(event.target.value)
    setAnimation(true);
  }
  const [search, setSearch] = useState("");
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setAnimation(true);
  };
  const handleClear = () => {
    setTitle("");
    setSearch("");
    setAnimation(true);
  }
  // filter the profiles based on the title
  const filterProfiles = profiles.filter((profile) => 
    (title === "" || profile.title === title) && profile.name.toLowerCase().includes(search.toLowerCase())
  );
  const buttonStyle = {
    border: "1px solid #ccc",
  }
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
          <div className="filter-wrapper">
            <div className="filter--select">
              <label htmlFor="title-select">Select a title: </label>
              <select id="title-select" onChange={handleTitleChange} value={title}>
                <option value="">All</option>
                {titles.map((title) => (<option key={title} value={title}>{title}</option>))}
              </select>
            </div>
            <div className="filter--search">
              <label htmlFor="search">Search by name: </label>
              <input type="text" id="search" onChange={handleSearchChange} value={search}/>
            </div>
            <button onClick={handleClear} style={buttonStyle}>Clear</button>
          </div>
          
          <div className="profile-cards">
            {filterProfiles.map((profile) => (
              <Card key={profile.email} {...profile} animate={animation} updateAnimate={handleAnimation}/>
            ))}
          </div>
      </Wrapper>
     </main>
    </>
  )
}

export default App;
