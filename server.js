require('dotenv').config()    //npm install dotenv

console.log(process.env)
const express=require('express')  //npm install express
// const mongoose=require('mongoose')  //npm install mongoose
const cors=require('cors')        //npm install cors
const {checkSchema}=require('express-validator')
const app=express()
const port=3050

// const Category=require('./app/models/category-model')
// const Expense=require('./app/models/expense-model')
const configureDB=require('./config/db')
const categoriesCltr=require('./app/controllers/categories-controller')
const expensesCltr=require('./app/controllers/expenses-controller')
const usersCltr=require('./app/controllers/users-controller')

const authenticateUser=require('./app/middlewares/auth')

const categoryValidationSchema=require('./app/validations/category-validation')
const expenseValidationSchema=require('./app/validations/expense-validation')

configureDB()

app.use(express.json())
app.use(cors())

app.get('/api/categories', authenticateUser, categoriesCltr.list)

app.post('/api/categories', authenticateUser, checkSchema(categoryValidationSchema),categoriesCltr.create)

app.put('/api/categories/:id', authenticateUser, checkSchema(categoryValidationSchema),categoriesCltr.update)

app.delete('/api/categories/:id', authenticateUser, categoriesCltr.remove)
/*
  windows users(if getting an error)
  
    1. go to c-drive
    2. create folder called data
    3. go inside the data folder, create folder called db
*/
   
  //request-list
  app.get('/api/expenses', authenticateUser, expensesCltr.list)

  //request handler-Create
  app.post('/api/expenses', authenticateUser, checkSchema(expenseValidationSchema),expensesCltr.create)

  //request handler-Delete
  app.delete('/api/expenses/:id', authenticateUser, expensesCltr.remove)

  //request handler- Update
  app.put('/api/expenses/:id', authenticateUser, checkSchema(expenseValidationSchema),expensesCltr.update)

  app.post('/api/users/login',usersCltr.login)

app.listen(port,()=>{
  console.log('expense app is running successfully on port' + port)
})
