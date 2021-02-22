import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'

// import styled from 'styled-components'
import './Header.css'

function Header(props) {

  const userAuth = useContext(AuthContext)
  
  const handleLogout = () => {
    userAuth.logout()
}


  return (
    <div id='header' >

{/* If not logged in will display */}
  {/* leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }} */}


 {/* Will display after login */}
      {userAuth.user &&
        <nav className='links-test'>
          <div className='home-link'>
            <Link to="/home">Home</Link>
          </div>

          <div className='month-link'>
            <Link to="/month">Month</Link>
          </div>

          <div className='week-link'>
            <Link to="/week">Week</Link>
          </div>

          <div className='day-link'>
            <Link to="/day">Day</Link>
          </div>
        </nav>
      }

      {userAuth.user &&
      <section id='logout-btn'>
          <button 
            className='logout-style'
            type='submit'
            onClick={handleLogout}>
              Logout
          </button>
      </section>
      }
    </div>
  )
}

export default Header
