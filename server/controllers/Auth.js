const bcrypt = require( "bcrypt" );
const jwt = require( "jsonwebtoken" );
const otpGenerator = require( "otp-generator" );
require( "dotenv" ).config();

const User = require( '../models/User' );
const OTP = require( '../models/OTP' );

const mailSender = require( "../config/mailSender" );


exports.signup = async ( req, res ) =>
{
	try
	{
		const { firstName, lastName, email, contact, password } = req.body;
		console.log( "In the Sign up controller", req.body );

		if ( !firstName || !lastName || !email || !password || !contact )
		{
			return res.status( 403 ).send( {
				success: false,
				message: "All Fields are required",
			} );
		}

		const existingUser = await User.findOne( { email } );

		if ( existingUser )
		{
			return res.status( 400 ).json( {
				success: false,
				message: "User already exists. Please sign in to continue.",
			} );
		}

		const HashedPassword = await bcrypt.hash( password, 10 );

		const image = `https://api.dicebear.com/5.x/initials/svg?seed=${ firstName } ${ lastName }`;


		const user = await User.create( {
			firstName, lastName, email, image, contact,
			password: HashedPassword,
		} );

		return res.status( 200 ).json( {
			success: true,
			user,
			message: "User registered successfully",
		} );

	}
	catch ( error )
	{
		console.error( error );
		return res.status( 500 ).json( {
			success: false,
			message: "User not registered. Please try again.",
		} );
	}
}

exports.login = async ( req, res ) =>
{
	try
	{
		const { email, password } = req.body;
		console.log( "In the Login controller", req.body );

		if ( !email || !password )
		{
			return res.status( 400 ).json( {
				success: false,
				message: `Please Fill up All the Required Fields`,
			} );
		}

		const user = await User.findOne( { email } );

		if ( !user )
		{
			// Return 401 Unauthorized status code with error message
			return res.status( 401 ).json( {
				success: false,
				message: `User is not Registered with Us Please SignUp to Continue`,
			} );
		}

		if ( await bcrypt.compare( password, user.password ) )
		{

			var token = jwt.sign( { email: user.email, id: user._id },
				process.env.JWT_SECRET,
				{ expiresIn: '3h', }
			);

			user.token = token;
			user.password = undefined;

			const options = {
				expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
				httpOnly: true,
			};

			return res.cookie( 'token', token, options ).status( 200 ).json( {
				success: true,
				token,
				user,
				message: 'User Login Success',
			} )

		}
		else
		{
			return res.status( 401 ).json( {
				success: false,
				message: `Password is incorrect`,
			} );
		}
	}
	catch ( error )
	{
		console.error( error );
		return res.status( 500 ).json( {
			success: false,
			message: "User cannot be Logged In. Please try again.",
		} );
	}
}

exports.otpGenerator = async ( req, res ) =>
{
	try
	{
		const { email } = req.body;
		if ( !email )
		{
			return res.status( 400 ).json( {
				success: false,
				message: "Email not found please try again",
			} );
		}

		const user = await User.findOne( { email } );

		if ( !user )
		{
			return res.status( 401 ).json( {
				success: false,
				message: `User with this Email is not Registered with Us Please SignUp to Continue`,
			} );
		}

		var otp = otpGenerator.generate( 5, {
			upperCaseAlphabets: false,
			lowerCaseAlphabets: false,
			specialChars: false,
		} );

		console.log( "opt generated : ", otp );

		const otpBody = await OTP.create( { email, otp } );
		console.log( "OTP body ", otpBody );

		// Mail Sender
		const emailResponse = await mailSender(
			"Reset password OTP verification mail",
			email,
			`${ otp } OTP for Password reset. `,
			`OTP for Password reset is : ${ otp }`,
		);
		console.log( "Email sent successfully:", emailResponse.response );

		return res.status( 200 ).json( {
			success: true,
			message: "OTP send successfully.",
		} )

	}
	catch ( error )
	{
		console.error( error );
		return res.status( 500 ).json( {
			success: false,
			message: "OTP not send. Please try again.",
		} );
	}
}

exports.resetPassword = async ( req, res ) =>
{
	try
	{
		const { email, otp, password, confirmPassword } = req.body;

		if ( !email || !otp || !password || !confirmPassword )
		{
			return res.status( 400 ).json( {
				success: false,
				message: `Please Fill up All the Required Fields`,
			} );
		}

		if ( confirmPassword !== password )
		{
			return res.status( 401 ).json( {
				success: false,
				message: `password and confirmPassword Not match.`,
			} );
		}

		const user = await User.findOne( { email } );

		if ( !user )
		{
			// Return 401 Unauthorized status code with error message
			return res.status( 401 ).json( {
				success: false,
				message: `User with this Email is not Registered with Us Please SignUp to Continue`,
			} );
		}

		const DBOTP = await OTP.find( { email } ).sort( { createdAt: -1 } ).limit( 1 );

		if ( DBOTP.length === 0 )
		{
			return res.status( 400 ).json( {
				success: false,
				message: "Please generated otp again."
			} );
		}
		else if ( otp !== DBOTP[ 0 ].otp )
		{
			return res.status( 400 ).json( {
				success: false,
				message: "OTP is not valid."
			} );
		}

		const HashedPassword = bcrypt.hash( password, 10 );

		const updated = await User.findOneAndUpdate(
			{ email: user.email },
			{ password: ( await HashedPassword ).toString() },
			{ new: true }
		);

		return res.status( 200 ).json( {
			success: true,
			//updated,
			message: `Password Changed Successfully.`,
		} );

	}
	catch ( error )
	{
		console.error( error );
		return res.status( 500 ).json( {
			success: false,
			message: "Password is not reset. Please try again.",
		} );
	}
}
