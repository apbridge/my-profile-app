import { useState, useEffect } from "react";
import style from '../styles/navbar.module.css';
const NavBar = () => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("darkMode") === "true";
      });
    
      useEffect(() => {
        if (darkMode) {
          document.body.classList.add("dark-mode");
        } else {
          document.body.classList.remove("dark-mode");
        }
        localStorage.setItem("darkMode", darkMode);
      }, [darkMode]);
    return (
        <nav className={`${style.navbar} section`}>
            <ul>
                <li>
                    <a href="#">Home</a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
                <li>
                    <a href="#">Profiles</a>
                </li>
            </ul>
            <button onClick={() => setDarkMode(!darkMode)} className={style["mode-toggle"]}>
                {darkMode ? "Light" : "Dark"}
            </button>
        </nav>
    );
}
export default NavBar;