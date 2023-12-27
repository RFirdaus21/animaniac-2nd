import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.jpg'

function Header() {
  return (
    <header>
      <Link to="/" className='logo'>
        <img src={logo} width={55} height={55} alt='animaniac' /> Animaniac
      </Link>

      <nav>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/anime-list" >Anime List</NavLink>
        <NavLink to="/about" >About</NavLink>
      </nav>
    </header>
  )
}

export default Header
