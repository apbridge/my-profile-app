
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
      email:'b@b.com'
    },
  ];
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
     <header>
        <NavBar />
     </header>
     <main>
       <Wrapper>
          <h1>Profile App</h1>
          <button onClick={handleClick}>
            {clicked ? "Clicked" : "Click me"}
          </button>
       </Wrapper>
      <Wrapper>
          <About />
      </Wrapper>
      <Wrapper>
          <div className="profile-cards">
            {profiles.map((profile) => (
              <Card key={profile.email} {...profile} />
            ))}
          </div>
      </Wrapper>
     </main>
    </>
  )
}

export default App;
