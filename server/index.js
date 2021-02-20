require('dotenv').config();
const express = require('express'),
      ctrlUser = require('./controllers/user'),
      ctrlExpense = require('./controllers/expenses'),
      auth = require('./middleware/authCheck');
const session = require('express-session');
const massive = require('massive');

const {CONNECTION_STRING, SERVER_PORT, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())

massive({
  connectionString: CONNECTION_STRING,
  ssl: {rejectUnauthorized: false}
}).then(db => {
  app.set('db', db)
  console.log('db connected!')
})

app.use(
  session({
    resave: true,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookies: {maxAge: 40000000}
  })
)

// Authorization Endpoints
app.post('/api/auth/register', ctrlUser.register)
app.post('/api/auth/login', ctrlUser.login)
app.get('/api/auth/me', ctrlUser.getUser)
app.post('/api/auth/logout', ctrlUser.logout)

// Expense Endpoints
app.get('/api/expenses-data', auth.userOnly, ctrlExpense.readExpenses)
app.post('/api/new-expense', auth.userOnly, ctrlExpense.createExpense)
app.put('/api/edit-expense/:id', auth.userOnly, ctrlExpense.editExpense)
app.get('/api/expense/:id', auth.userOnly, ctrlExpense.readExpense)
app.delete('/api/expense/:id', auth.userOnly, ctrlExpense.deleteExpense) 

// We're listening
app.listen(SERVER_PORT, _ => console.log(`Hi! I'm your server and I'm listening on port: ${SERVER_PORT}! This is so exciting!!!`))