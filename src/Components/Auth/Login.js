import React, {useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'

function Auth(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const userAuth = useContext(AuthContext)

const handleLogin = () => {
  userAuth.login(email, password)
  setEmail('')
  setPassword('')
}



  return (
    <div>
      <input
        placeholder='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Enter Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      
      <Link to='/register' >
        <button>Register Here!</button>
      </Link>

    </div>
  )
}

export default Auth
