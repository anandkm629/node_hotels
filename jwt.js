const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {
   // Extract the jwt token from request header
   const toen = req.headers.authorization.split(' ')[1];
   if(!token) return res.status(401).json({error: 'Unauthorised'});

   try {
    // Verify the jwt token
    const decoded = jwt.verify(token,procees.env.JWT_SECRET);
    // Attach the user information to the request 
    req.userPayLoad = decoded;
    next();
   }catch(err) {
    console.log(err);
    res.status(401).json({error:'Invalid token '});
   }
}
// Function to generate jwt token 

const generateToken = (userData)=> {
   
     return jwt.sign(userData,process.env.JWT_SECRET);
}

module.exports =  {jwtAuthMiddleware,generateToken}