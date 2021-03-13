import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import './User.scss'

function Login(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userAuth = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    userAuth.login(email, password)
    setEmail('')
    setPassword('')
  }



  return (
    <div>

      <form id='login-container' onSubmit={handleLogin}>

        <h3>Welcome! Please Login Below</h3>

        <section>
          <input
            autoFocus
            className='entry-text'
            type='text'
            autoComplete='username'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='entry-text'
            type='password'
            autoComplete='current-password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </section>

        <section id='login-btn'>
          <button 
            className='login-style' 
            type='submit'>
              Login
          </button>
        </section>

        <section id='register-btn'>
          <Link to='/register' >
            <button 
              className='register-style' 
              type='button'>
                Register
            </button>
          </Link>
        </section>


      </form>
    </div>
  )
}

export default Login
