import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'


import './Header.scss'

function Header(props) {

  const userAuth = useContext(AuthContext)
  // const getUser = useContext(AuthContext)
  
  const handleLogout = () => {
    userAuth.logout()
}



  const loggedInHeader = () => {
  return (
  <section className='header-logged-in'>
    <section className='welcome-box'>
      <div className='welcome'>
        Welcome {userAuth.user.firstName}!
      </div>
    </section>

    <h1 className='title'>Bill Track</h1>

    <section className='link-bar'>
      <div className='home-link'>
        <Link to="/home">Home</Link>
      </div>

      <div className='expenses-link'>
        <Link to="/expenses">Expenses</Link>
      </div>
    </section>

    <section id='logout-btn'>
      <button
        className='logout-style'
        type='submit'
        onClick={handleLogout}>
        Logout
      </button>
    </section>
  </section>
  )}


  const loggedOutHeader = () => {
    return (
      <div>
        <h3>Welcome to</h3>
        <h1 className='title'>Bill Track</h1>
      </div>
    )
  }


  return (
    
    <div id='header-bar'>
      <div className='header-options'>

      <section className='header-logged-out'>
        {!userAuth.user &&
          loggedOutHeader()
        }
        {userAuth.user &&
          loggedInHeader()
        }
      </section>




      </div>
    </div>
  )
}

export default Header
