import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'

import {makeStyles} from '@material-ui/core/styles'
import SvgIcon from '@material-ui/core/SvgIcon'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

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
        <section className='link-bar'>
          <div className='home-link'>
            <Link to="/home"><HomeIcon style={{fontSize: 55}} />
              <span>Home</span>
            </Link>
          </div>
          <div className='expenses-link'>
            <Link to="/expenses"><MonetizationOnIcon style={{fontSize: 55}} />
              <span>Expenses</span>
            </Link>
          </div>
      </section>
      </div>
    </section>

    <h1 className='title'>Bill Track</h1>



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



  function HomeIcon(props) {
    return(
      <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </SvgIcon>
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
