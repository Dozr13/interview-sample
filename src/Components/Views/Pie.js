import React, {useContext, useEffect} from 'react'
// import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import axios from 'axios'

function Pie() {
    const userAuth = useContext(AuthContext)
    // const {push} = useHistory()
    
  useEffect(() => {
    if(!userAuth.user){
      axios.get('/api/auth/me').then(({data}) => {
        userAuth.setUser(data)
      }).catch(err => console.log(err))}
      // }).catch(err => push('/login'))}
    }, [])
    // }, [push, userAuth, userAuth.user])
    
      return (
    <div>
      This is the Pie component! Also bound to use Chart.js!      
    </div>
  )
}

export default Pie