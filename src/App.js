import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import About from './components/About';

function App() {
  return (
  <>
    <BrowserRouter>
    <Navbar/>
    <h1> This is iNoteBook</h1>
    <Routes>
      
    <Route path="/" element={<Home/>}></Route>
    <Route path="/About" element={<About/>}></Route>       
       </Routes> 
       </BrowserRouter>
  </>
  );
}

export default App;
