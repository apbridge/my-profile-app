import "./App.css";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import AddProfilePage from "./pages/AddProfilePage";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProfileDetailPage from "./pages/ProfileDetailPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfileLayoutPage from "./pages/ProfileLayoutPage";
import { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import {ModeContext} from "./contexts/ModeContext";
import {useContext} from "react";


const App = () => {
  const { mode } = useContext(ModeContext);

  return (
    <HashRouter>
      <header>
        <Navbar />
      </header>
      <main className={mode === "light" ? "light" : "dark"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/add-profile" element={<AddProfilePage />} />
          <Route path="/profile/:id" element={<ProfileLayoutPage />} >
            <Route index element={<ProfileDetailPage />} />
            <Route path="edit" element={<ProfileEditPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </HashRouter>
  );
};

export default App;