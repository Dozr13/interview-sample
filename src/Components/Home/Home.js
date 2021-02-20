import React, {useContext, useEffect} from 'react'
// import {useHistory} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext'
import axios from 'axios'

function Home() {
const userAuth = useContext(AuthContext)
// const {push} = useHistory()
// console.log(userAuth)
useEffect(() => {
  if(!userAuth.user){
    axios.get('/api/auth/me').then(({data}) => {
      userAuth.setUser(data)
    }).catch(err => (err))}
}, [])


  return (
    <div>
      This is the home component!
    </div>
  )
}

export default Home