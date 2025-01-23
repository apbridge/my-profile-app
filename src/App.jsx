
import './App.css';
import About from "./components/About";
import Navbar from "./components/NavBar";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";
import image_man from "./assets/headshot-woman.png";
import image_woman from "./assets/headshot-woman2.png";
import Card from "./components/Card";

const App = () => {
  const profiles =[
    {
      img: image_man,
      name:'John Doe',
      title:'Software Engineer',
      email:'a@a.com'
    },
    {
      img: image_man,
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
        <Navbar />
     </header>
     <main>
       <Wrapper>
          <h1>Profile App</h1>
          <button onClick={handleClick}>
            {clicked ? "Click me" : "Clicked"}
          </button>
       </Wrapper>
      <Wrapper>
          <About />
      </Wrapper>
      <Wrapper>
          <div className="profile-cards">
            {profiles.map((profile) => {
              <Card key={profile.email} {...profile} />
            })}
          </div>
      </Wrapper>
     </main>
    </>
  )
}

export default App;
