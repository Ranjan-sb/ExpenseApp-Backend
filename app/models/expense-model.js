const mongoose=require('mongoose')
const{Schema, model}=mongoose

const expenseSchema=new Schema({
  expenseDate:String,
  amount:Number,
  categoryId:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'Category'
  },
  description:String
}, {timestamps:true})

const Expense= model('Expense', expenseSchema)
module.exports=Expense