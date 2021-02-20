import React, {useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import axios from 'axios'

function Graph() {
  const userAuth = useContext(AuthContext)
  const {push} = useHistory()

  useEffect(() => {
    if(!userAuth.user){
      axios.get('/api/auth/me').then(({data}) => {
        userAuth.setUser(data)
      }).catch(err => push('/login'))}
  }, [userAuth.user])
  return (
    <div>
      This is the Graph Component! Bound to include Chart.js      
    </div>
  )
}


export default Graph