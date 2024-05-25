const Expense=require('../models/expense-model')
const {validationResult}=require('express-validator')
const expensesCltr={}

expensesCltr.list=async(req,res)=>{
  try{
    const expenses=await Expense.find()
    res.json(expenses)
  }
  catch(err){
    console.log(err)
    res.status(500).json({notice:'Internal server error'})
  }
}
// expensesCltr.list=(req,res)=>{
//   Expense.find()
//       .then((expenses)=>{
//         res.json(expenses)
//       })
//       .catch((err)=>{
//         res.json(err)
//       })
// }

expensesCltr.create=async(req,res)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const body=req.body
  const exp=new Expense(body)
  try{
    //const exp=await Expense.create(body)
    await exp.save()
    res.status(201).json(exp)
  }
  catch(err){
    console.log(err)
    res.status(500).json({notice:'internal server error'})
  }
}
// expensesCltr.create=(req,res)=>{
//   const errors=validationResult(req)
//     if(!errors.isEmpty()){
//       return res.status(400).json({errors:errors.array()})
//     }
//     const body=req.body
//     const exp=new Expense(body)
//     exp.save()
//       .then((expObj)=>{
//         res.json(expObj)
//       })
//       .catch((err)=>{
//         res.json(err)
//       })
// }

expensesCltr.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    const body=req.body
    try{
      const expense=await Expense.findByIdAndUpdate(id,body,{new:true, runValidators:true})
      res.json(expense)
    }catch(err){
      console.log(err)
      res.status(500).json({notice:'internal server error'})
    }
}
// expensesCltr.update=(req,res)=>{
//   const errors=validationResult(req)
//     if(!errors.isEmpty()){
//       return res.status(400).json({errors:errors.array()})
//     }
//   const id=req.params.id
//     const body=req.body
//     Expense.findByIdAndUpdate(id,body,{new:true, runValidators:true})
//       .then((exp)=>{
//         res.json(exp)
//       })
//       .catch((err)=>{
//         res.json(err)
//       })
// }

expensesCltr.remove=async(req,res)=>{
  const id=req.params.id
  try{
    const expense=await Expense.findByIdAndDelete(id)
    res.json(expense)
  }catch(err){
    console.log(err)
    res.status(500).json({notice:'Internal Server Error'})
  }
}
// expensesCltr.remove=(req,res)=>{
//   const Id=req.params.id
//     Expense.findByIdAndDelete(Id)
//       .then((exp)=>{
//         res.json(exp)
//       }) 
//       .catch((err)=>{
//         res.json(err)
//       })
// }

module.exports=expensesCltr