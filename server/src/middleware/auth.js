const jwt = require('jsonwebtoken')
const User = require('../database/models/User')


const auth = (req, res, next) => {
   const {authorization} = req.headers

   if (!authorization) {
      return res.status(401).json({error: "Authorization denied!"})
   }

   const token = authorization.split(' ')[1]


   try {
      const {_id} = jwt.verify(token, process.env.JWT_SECRET)

      req.user = User.findOne({_id}).select("id")
      next()
       
   } catch (error) {
      console.log();
      return res.status(403).json({error: "Invalid token"})
   }
}

module.exports = {
   auth
}