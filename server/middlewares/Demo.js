
exports.demo = async(req,res,next) =>{
	try{
		console.log("This is Demo middleWare to testing",req.body);
		next();
	}
	catch(error){
		return res.status(401).json({
			success: false,
			message: "This is a Demo User",
		});
	}
}