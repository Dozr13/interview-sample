import React, {useState, useContext} from 'react'
import {AuthContext} from '../../Context/AuthContext'
import {TextField} from '@material-ui/core';
import {Tooltip} from '@material-ui/core';
import {useHistory} from 'react-router-dom'

function Register() {
  const [email, setEmail] = useState('')
  const [firstName, setFirst] = useState('')
  const [lastName, setLast] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setPic] = useState('')
  const userAuth = useContext(AuthContext)

  const history = useHistory()

  const register = () => {
    userAuth.register(email, firstName, lastName, password, profilePic)
    setEmail('')
    setFirst('')
    setLast('')
    setPassword('')
    setPic('')
  }
  
  return (
    <div className='registration-page'>
      <section className='reg-login'>
        <h3>Already a member?</h3>
        <button  className='back-to-login' onClick={() => history.goBack()}>Back to Login!</button>
      </section>
      
        <div className='register-form'>
          <Tooltip title='This will become your username for login!'>
            <TextField
              placeholder='Enter Email'
              autoComplete='username'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
          </Tooltip>
          <TextField
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirst(e.target.value)}
            />
          <TextField
            placeholder='Last Name'
            value={lastName}
            onChange={(e) => setLast(e.target.value)}
            />
          <TextField
            type='password'
            autoComplete='new-password'
            placeholder='Password: '
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          <TextField
            placeholder='Profile Pic'
            value={profilePic}
            onChange={(e) => setPic(e.target.value)}
            />
            <button className='reg-btn' onClick={register}>Register</button>
      </div>

    </div>
  )
}

export default Register
