import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav class="navbar"style={{backgroundColor:"black", color:"white"}}>
        <div class="container-fluid">
        <Link to="/" ><a class="navbar-brand" style={{textDecoration: "none", color:"white"}}>SysHub</a></Link>
            <Link to="/register" style={{textDecoration:"none", color:"white"}}><div class="register">Register</div></Link>
        </div>
    </nav>
  )
}

export default Navigation