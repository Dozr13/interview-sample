import React, {useState, useContext} from 'react'
import {AuthContext} from '../../Context/AuthContext'

function Register() {
  const [email, setEmail] = useState('')
  const [firstName, setFirst] = useState('')
  const [lastName, setLast] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setPic] = useState('')
  const userAuth = useContext(AuthContext)

  const register = () => {
    userAuth.register(email, firstName, lastName, password, profilePic)
    setEmail('')
    setFirst('')
    setLast('')
    setPassword('')
    setPic('')
  }

  return (
    <div>
      <input
        placeholder='Enter Email'
        autoComplete='username'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder='First Name'
        value={firstName}
        onChange={(e) => setFirst(e.target.value)}
      />
      <input
        placeholder='Last Name'
        value={lastName}
        onChange={(e) => setLast(e.target.value)}
      />
      <input
        type='password'
        autoComplete='new-password'
        placeholder='Password: '
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder='Profile Pic'
        value={profilePic}
        onChange={(e) => setPic(e.target.value)}
      />

      <button onClick={register}>Register</button>
    </div>
  )
}

export default Register
