import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../../../Context/AuthContext'
import axios from 'axios'

function Graph() {
  // const userAuth = useContext(AuthContext)

  // useEffect(() => {
  //   if(!userAuth.user){
  //     axios.get('/api/auth/me').then(({data}) => {
  //       userAuth.setUser(data)
  //     }).catch(err => console.log(err))}
  // }, [])

  return (
    <div>
      This is the Graph Component! Bound to include Chart.js      


      <h1>DISPLAY THIS PAGE AFTER LOGIN</h1>
    </div>
  )
}


export default Graph