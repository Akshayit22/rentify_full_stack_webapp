const jwt = require("jsonwebtoken");


exports.AuthMid = async(req,res,next) =>{
	try{
		const token = req.body.token || req.header('Authorization').replace('Bearer ','') || req.cookies.token;

		if(!token){
			return res.status(401).json({
				success:false,
				message:'Token is missing',
			});
		}

		try{
			console.log("Token from Middeleware",token);
			const decode =  jwt.verify(token, process.env.JWT_SECRET);
			// console.log("decode ",decode);
			// decode = { email: user.email, id: user._id }
			req.user = decode; // IMP
		}
		catch(error) {
			//verification - issue
			console.log(error);
			return res.status(401).json({
			    success:false,
			    message:'token is invalid',
			});
		}

		console.log("Token is authenticated in Auth Middeleware");
		next();
	}
	catch(error){
		console.log(error);
		return res.status(401).json({
			success: false,
			message: "Token is missing, you need to login first,",
		});
	}
}