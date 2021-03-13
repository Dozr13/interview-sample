import {createContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null)
  const {push} = useHistory()
  
  const getUser = () => {
    axios.get('/api/auth/me').then(({data}) => {
      // console.log(data)
      setUser(data)
    })
  }
  
  const login = (email, password) => {
    axios.post('/api/auth/login', {email, password}).then(({data}) => {
      // console.log(data)
      setUser(data)
      push('/home')
    })
  }
  
  const logout = () => {
    axios.post('/api/auth/logout').then(({data}) => {
      setUser(null)
        push('/')
      })
    }
    
    const register = (email, firstName, lastName, password, profilePic) => {
      axios.post('/api/auth/register', {email, firstName, lastName, password, profilePic}).then(({data}) => {
      // console.log(data)
      setUser(data)
      push('/home')
    })
  }

  const updateUser = (email, firstName, lastName, password, profilePic, id) => {
    axios.put(`/api/auth/update/${id}`, {email, firstName, lastName, password, profilePic}).then(({data}) => {
      getUser(user)
      setUser(data)
      push('/home')
    })
  }
  
  
  return (
    <AuthContext.Provider value={{user, getUser, setUser, login, logout, register, updateUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}

