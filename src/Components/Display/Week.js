import React, {useContext, useEffect}  from 'react'
import {AuthContext} from '../../Context/AuthContext'
import axios from 'axios'

function Week() {


  const userAuth = useContext(AuthContext)


  useEffect(() => {
    if(!userAuth.user){
      axios.get('/api/auth/me').then(({data}) => {
        userAuth.setUser(data)
      }).catch(err => console.log(err))}
  }, [])


  return (
    <div>
      This is the Week Component!
    </div>
  )
}

export default Week
