const categoryValidationSchema={
  name:{
    notEmpty:{
      errorMessage:'Category name is required'
    }
  }
}
module.exports=categoryValidationSchema