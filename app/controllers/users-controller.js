const jwt=require('jsonwebtoken') //npm install jsonwebtoken
const usersCltr={}

usersCltr.login=(req,res)=>{
  const body=req.body
  if(body.email==process.env.EMAIL && body.password==process.env.PASSWORD){
    const tokenData={id: process.env.ID}
    const token=jwt.sign(tokenData,  process.env.JWT_SECRET, {expiresIn:'14d'})
    /*
    (npmjs.com/package/jsonwebtoken)
    jwt.sign(1st arg= payload or tokenData (which has id of user)
       2nd arg=secret or private key(i.e., JWT_SECRET), 3rd arg=options)
    */
    /*res.json({
      notice:'successfully logged in'
    })*/
    res.json({token: token})//this token is sent to front-end
    //generate a jwt(json web token) token and send the token to the front end
  }else{
    res.status(401).json({
      notice:'Invalid email/password'
    })  
  }
}

module.exports=usersCltr