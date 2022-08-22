import React, { createContext } from 'react';
import {useEffect,useContext,useReducer} from "react"
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/screens/Home';
import Login from './components/screens/Login';
import Signup from './components/screens/Signup';
import Profile from './components/screens/Profile';
import {BrowserRouter,Route,Routes,useNavigate} from "react-router-dom"
import Createpost from './components/screens/Createpost';


  
  

function App() {
  return (
   
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route exact path="/" element={<Login />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Createpost />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App;
