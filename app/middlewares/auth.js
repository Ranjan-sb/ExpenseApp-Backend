const jwt=require('jsonwebtoken')
const authenticateUser=(req,res,next)=>{
  const token=req.headers['authorization']
  if(token){
    /*
      try & catch is-
        1. called as exception handling
        2. for handling runtime errors/exceptions
    */
    try{
       const tokenData=jwt.verify(token, process.env.JWT_SECRET)
      next()
    } catch(e){
      res.status(401).json(e)
    }
  }else{
    res.status(401).json({errors:'token is required'})
  }
}

module.exports=authenticateUser