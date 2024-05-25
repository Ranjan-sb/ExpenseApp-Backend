const expenseValidationSchema={
  expenseDate:{
    notEmpty:{
      errorMessage:'date cant be empty'
    }, 
    isDate:{
      errorMessage:'enter valid date'
    }
  },
  amount:{
    notEmpty:{
      errorMessage:'amount cannot be empty'
    },
    // notNumeric:{
    //   errorMessage:'amount should be numbers only'
    // },
    isFloat:{
      options:{min:1},
      errorMessage:'amount should be minimum 1 rupee'
    }
  },
  categoryId:{
    notEmpty:{
      errorMessage:'CategoryId cannot be empty'
    },
    isMongoId:{
      errorMessage:'Inavalid Id'
    }
    
  }
  
}
module.exports=expenseValidationSchema