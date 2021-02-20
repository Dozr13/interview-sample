import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import './Header.css'

function Header(props) {

  const userAuth = useContext(AuthContext)

const handleLogout = () => {
  userAuth.logout()
}


  return (
    <div>
      <nav className='links-test'>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/graph">View as Graph</Link>
        <Link to="pie">View as Pie Chart</Link>
      </nav>

      <section id='logout-btn'>
          <button className='logout-style' type='submit' onClick={handleLogout}>Logout</button>
        </section>
    </div>
  )
}

export default Header
