import React, { useState, useEffect , useReducer} from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from '@mui/material';
import '../App.css'
import { useSelector, useDispatch } from 'react-redux';
import { userLogout, USER_LOGOUT } from '../redux/Action';


function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [forceUpdate] = useReducer(x => x + 1, 0);

  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);
  const state = useSelector((e) => e.login.token)
  //console.log("state",state)

  var user = JSON.parse(localStorage.getItem("user"))
  //console.log("user",user)

useEffect(() => {
 
}, [])



  const clearDetail = () =>{
    console.log("clicked")
    localStorage.clear();
    dispatch(userLogout())
  navigate("/login")
 
  }




  //console.log("userinfo",userinfo)



  return (
    <div>
      <div className={click ? "main-container" : ""} onClick={() => Close()} />
      <nav className="navbar" onClick={e => e.stopPropagation()}>
        <div className="nav-container">
          <NavLink exact to="/home" className="nav-logo">
            Battle feild

          </NavLink>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {
              state ?
              <>
              <li className="nav-item">
                <NavLink
                  exact
                  to="/create"
                  className="nav-links"
                >
                  {"Welcome "+state.name}
                </NavLink>

              </li>
              <li>
                <Button onClick={clearDetail}>Logout</Button>
              </li>
              </> :
                <>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/login"
                      className="nav-links"
                      onClick={click ? handleClick : null}
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      exact
                      to="/signup"
                      className="nav-links"
                      onClick={click ? handleClick : null}
                    >
                      Signup
                    </NavLink>
                  </li>
                </>


            }

          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
          </div>
        </div>
      </nav>
    </ div>
  );
}

export default Navbar