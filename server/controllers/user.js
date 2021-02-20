const bcrypt = require('bcryptjs')

module.exports = {
  // Passes Postman tests
  register: async (req, res) => {
    const {email, first_name, last_name, password, profile_pic} = req.body
    const db = req.app.get('db')
    const result = await db.user.find_user([email])
    const existingUser = result[0]
    if(existingUser){
      return res.status(409).send('Email is already being used, please try again with a different email address!')
    }
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    const registeredUser = await db.user.create_user([email, first_name, last_name, hash, profile_pic])
    const user = registeredUser[0]
    req.session.user = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      profile_pic: user.profile_pic
    }
    return res.status(200).send(req.session.username)
  },

  // Passes Postman tests
  login: async (req, res) => {
    const {email, password} = req.body
    const foundUser = await req.app.get('db').user.find_user([email])
    const user = foundUser[0]
    if(!user){
      return res.status(401).send('No user found, register as a new user to continue!')
    }
    const isAuthenticated = bcrypt.compareSync(password, user.password)
    if(!isAuthenticated){
      return res.status(403).send('Incorrect Password, please try again')
    }
    req.session.user = {id: user.id, email: user.email, first_name: user.first_name, last_name: user.last_name, profile_pic: user.profile_pic}
    return res.send(req.session.user)
  },

  // Passes Postman tests
  logout: async (req, res) => {
    req.session.destroy()
    return res.sendStatus(200)
  },


  // Passes Postman tests
  getUser: async (req, res) => {
    if(req.session.user){
      return res.status(200).send(req.session.user)
    }
    res.sendStatus(404)
  }
}