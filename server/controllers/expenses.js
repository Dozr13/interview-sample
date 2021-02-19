let errorMessage = "Oops! Something went wrong. Our engineers have been informed!"

module.exports = {
  readExpenses: async (req, res) => {
    // console.log(req)
    const {id} = req.session.user;
    const {start, end} = req.body;
    const db = await req.app.get('db')
    if (start && end){
      db.expenses.read_all_expenses_date(id, start, end)
        .then(expenses => res.status(200).send(expenses))
    } else if (start){
      db.expenses.read_all_expenses_date(id, start, Date.now())
        .then(expenses => res.status(200).send(expenses))
    } else {
      db.expenses.read_all_expenses(id)
        .then(expenses => res.status(200).send(expenses))
    }
  },

  // Passes Postman tests
  createExpense: (req, res) => {
    // console.log('make')
    const db = req.app.get('db')
    const {id} = req.session.user
    const {due_date, expense_title, amount, bill_type} = req.body
    if(id){
      db.expenses.create_expense([new Date(due_date), expense_title, amount, bill_type, id])
        .then(expense => expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({}))
        .catch(err => console.log(err))
    }
  },

  // Passes Postman test
  // ! Later edit if 1 item is left blank, currently throws typeError.
  editExpense: async (req, res) => {
    const {due_date, expense_title, amount, bill_type} = req.body
    const bill = await req.app.get('db').expenses.read_expense([req.params.id, req.session.user.id])[0]
    // let newBill = [due_date: due_date || bill.due_date, expense_title: expense_title || bill.expense_title, amount: amount || bill.amount, bill_type: bill_type || bill.bill_type]
    let dd = due_date || bill.due_date
    let et = expense_title || bill.expense_title
    let am = amount || bill.amount
    let bt = bill_type || bill.bill_type
    // console.log(newBill)
    req.app.get('db').expenses.edit_expense ([new Date(dd), et, am, bt, req.params.id, req.session.user.id]) 
    .then(expense => expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({}))
  },

  // Passes Postman tests
  readExpense: (req, res) => {
    // console.log('read')
    req.app.get('db').expenses.read_expense([req.params.id, req.session.user.id])
      .then(expense => expense[0] ? res.status(200).send(expense[0]) : res.status(200).send({}))
  },

  // Passes Postman tests
  deleteExpense: (req, res) => {
    // console.log('delleeetete')
    req.app.get('db').expenses.delete_expense([req.params.id, req.session.user.id])
      .then(_ => res.sendStatus(200))


      .catch( err => {
        
      })
  }
}