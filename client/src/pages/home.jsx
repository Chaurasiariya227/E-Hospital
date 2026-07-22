import { useState } from "react";
import AuthModal from "../components/AuthModal";
import { useNavigate } from "react-router-dom";
import Hero from "../components/hero";
import Departments from "../sections/Departments";
function Home() {
  
  return (
  <>
    
    <Hero />
    <Departments />
  </>
  );
}

export default Home;