const Category=require('../models/category-model')
const {validationResult}=require('express-validator')
const categoriesCltr={}

categoriesCltr.list=async(req,res)=>{
  try{
    const categories=await Category.find()
    res.json(categories)
  }
  catch(err){
    console.log(err)
    res.status(500).json({notice:'Internal Server Error'})
  }
}

// categoriesCltr.list=(req,res)=>{
//   Category.find()
//     .then((categories)=>{
//       res.json(categories)  
//     })
//     .catch((err)=>{
//       res.json(err)
//     })
// }

categoriesCltr.create=async(req,res)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const body=req.body
  const category=new Category(body)
  try{
    await category.save()
    res.status(201).json(category)
  }catch(err){
    console.log(err)
    res.status(500).json({notice:'Internal Server Error'})
  }  
}
// categoriesCltr.create=(req,res)=>{
//   const errors=validationResult(req)
//   if(!errors.isEmpty()){
//     return res.status(400).json({errors:errors.array()})
//   }
//   const data=req.body
//     const c1=new Category()
//     c1.name=data.name
//     c1.save()
//       .then((category)=>{
//         res.json(category)
//       })
//       .catch((err)=>{
//         res.json(err)
//       })
// }

categoriesCltr.update=async (req,res)=>{
  const errors=validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  const id=req.params.id
  const body=req.body
  try{
    const category=await Category.findByIdAndUpdate(id,body,{new:true})
  }
  catch(err){
    console.log(err)
    res.status(500).json({notice:'internal server error'})
  }
}
// categoriesCltr.update=(req,res)=>{
//   const id=req.params.id
//     const body=req.body
//     Category.findByIdAndUpdate(id,body,{new:true, runValidators:true})
//       .then((category)=>{
//         res.json(category)
//       })
//       .catch((err)=>{
//         res.json(err)
//       })
// }


categoriesCltr.remove=async(req,res)=>{
  const id=req.params.id
  try{
    const category=await Category.findByIdAndDelete(id)
    res.json(category)
  }catch(err){
    console.log(err)
    res.status(500).json({notice:'Internal sever error'})
  }
}
// categoriesCltr.remove=(req,res)=>{
//   const id=req.params.id
//   Category.findByIdAndDelete(id)
//     .then((category)=>{
//       if(!category){
//         res.status(404).json({error:'record not found'})
//       }else{
//         res.json(category)
//       }
//     })
//     .catch((err)=>{
//       res.json(err)
//     })
// }

module.exports=categoriesCltr
