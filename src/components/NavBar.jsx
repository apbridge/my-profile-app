import styles from "../styles/navbar.module.css";
import { Link } from "react-router-dom";
import {ModeContext} from "../contexts/ModeContext";
import {useContext} from "react";

const Navbar = () => {
  const {mode, handleModeChange} = useContext(ModeContext);
  return (
    <nav className={`${styles["navbar"]}`}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
        <Link to="/about">About</Link>
        </li>
        <li>
        <Link to="/add-profile">Add Profile</Link>
        </li>
      </ul>
      <button onClick={handleModeChange}>
        {mode === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;