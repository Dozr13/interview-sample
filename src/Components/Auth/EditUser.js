import React, {useState, useContext, useEffect} from 'react'
import {AuthContext} from '../../Context/AuthContext'

import './User.scss'

function EditUser(props) {
  const userAuth = useContext(AuthContext)
  
  const [email, setEmail] = useState('')
  const [firstName, setFirst] = useState('')
  const [lastName, setLast] = useState('')
  const [password, setPassword] = useState('')
  const [profilePic, setPic] = useState('')

  useEffect(() => {
    setEmail(userAuth.user.email)
    setFirst(userAuth.user.firstName)
    setLast(userAuth.user.lastName)
    setPassword(userAuth.user.password)
    setPic(userAuth.user.profilePic)
  }, [props])

  const updateUser = (e) => {
    userAuth.updateUser(email, firstName, lastName, password, profilePic, props.id)
  }
  
  return (
    <div id='edit-page'>
      <div className='user-info'>
        <h1>You can edit your user info here</h1>
          <h5>Account Name</h5>
          <input
            disabled
            placeholder={email}
            autoComplete='username'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        <br />
          <h3 className='edit-title'>First Name</h3>
          <input
            className='edit-input'
            placeholder='First Name'
            value={firstName}
            onChange={(e) => setFirst(e.target.value)}
            />
          <br />
            <h3 className='edit-title'>Last Name</h3>
            <input
              className='edit-input'
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => setLast(e.target.value)}
            />
          <br />
            <h3 className='edit-title'>Password</h3>
            <input
              className='edit-input'
              type='password'
              autoComplete='new-password'
              placeholder='Password: '
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          <br />
            <h3 className='edit-title'>Profile Picture</h3>
            <input
              className='edit-input'
              placeholder='Profile Pic'
              value={profilePic}
              onChange={(e) => setPic(e.target.value)}
            />
          <br />

        <button onClick={() => updateUser()}>Update User</button>
      </div>
    </div>
  )
}

export default EditUser
