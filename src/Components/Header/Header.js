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



  const ifLoggedInHeader = () => {
  return (
  <section className='header-logged-in'>
    <div className='welcome'>
      Welcome, {userAuth.user.firstName}
    </div>
    <div className='home-link'>
      <Link to="/home">Home</Link>
    </div>

    <h1 className='title'>Bill Track</h1>

    <div className='month-link'>
      <Link to="/month">Month</Link>
    </div>

    <div className='week-link'>
      <Link to="/week">Week</Link>
    </div>

    <div className='day-link'>
      <Link to="/day">Day</Link>
    </div>

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


  return (
    
    <div id='header-bar'>
      <div className='header-options'>

      <section className='header-logged-out'>
        {!userAuth.user &&
        <h1 className='title'>Bill Track</h1>
        }
        {userAuth.user &&
          ifLoggedInHeader()
        }
      </section>




      </div>
    </div>
  )
}

export default Header
