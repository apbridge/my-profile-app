
import './App.css';
import About from "./components/About";
import Navbar from "./components/NavBar";
import Card1 from "./components/Card1";
import Card2 from "./components/Card2";

const App = () => {
  return (
    <>
     <header>
        <Navbar />
     </header>
     <main>
        <div className="section">
          <div className="container">
            <h1>Profile App</h1>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <About />
          </div>
        </div>
        <div className="section">
          <div className="container">
            <div className="profile-cards">
              <Card1 />
              <Card2 />
            </div>
          </div>
        </div>
     </main>
    </>
  )
}

export default App;
