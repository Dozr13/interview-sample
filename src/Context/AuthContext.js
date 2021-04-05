import {createContext, useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {
  const [user, setUser] = useState('')

  // const initialState = {
  //   isAuthenticated: false,
  //   user: null,
  //   token: null,
  // };

  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "LOGIN":
  //       localStorage.setItem("user", JSON.stringify(action.payload.user));
  //       localStorage.setItem("token", JSON.stringify(action.payload.token));
  //       return {
  //         ...state,
  //         isAuthenticated: true,
  //         user: action.payload.user,
  //         token: action.payload.token
  //       };
  //     case "LOGOUT":
  //       localStorage.clear();
  //       return {
  //         ...state,
  //         isAuthenticated: false,
  //         user: null,
  //         token: null,
  //       };
  //     default:
  //       return state;
  //   }
  // };

  
  const {push} = useHistory()
  
  const getUser = () => {
    axios.get('/api/auth/user').then(({data}) => {
      setUser(data)
    })
  }
  
  const login = (email, password) => {
    axios.post('/api/auth/login', {email, password}).then(({data}) => {
      setUser(data)
      push('/home')
    })
  }
  
  const logout = () => {
    axios.post('/api/auth/logout').then(() => {
      setUser(null)
        push('/')
      })
    }
    
    const register = (email, firstName, lastName, password, profilePic) => {
      axios.post('/api/auth/register', {email, firstName, lastName, password, profilePic}).then(({data}) => {
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

