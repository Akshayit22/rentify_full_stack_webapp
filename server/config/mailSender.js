const nodemailer = require( 'nodemailer' );
require( 'dotenv' ).config();

const mailSender = async ( subject, email, title, body ) =>
{
	try
	{
		let transporter = nodemailer.createTransport( {
			host: process.env.MAIL_HOST,
			post: 587,
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			}
		} )

		let info = await transporter.sendMail( {
			from: `${ process.env.MAIL_USER }`,
			to: `${ email }`,
			subject: `${ subject }`,
			html: `${ body }`,
		} )

		console.log( info );
		return info;

	}
	catch ( error )
	{
		console.log( error.message );
		return error;
	}
}
module.exports = mailSender;


/*
How to Use : 

const mailSender = require("../utils/mailSender");
const emailResponse = await mailSender(
				email,
				"Subject",
				"title",
				"body",
			);
console.log("Email sent successfully:", emailResponse.response);


*/