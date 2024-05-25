const swaggerAutogen = require('swagger-autogen')();

const doc = {
	info:{
		title:'BetterBlog- Blog Application system with MERN stack',
		description:'full-stack application that allows users to create, update, read, search, save and comment on blogs of different categories. \n I build this Application using React, Redux, TailwindCss, Axios in frontend and Nodejs, Mongodb, Nodemailer, Cloudinary, JWT authentication in backend.'
	},
	host:"https://betterblog-blog-app.onrender.com/api/v1"
	// host:'localhost:3000/api/v1/'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/Blog.js','./routes/Comment.js','./routes/Profile.js','./routes/User.js'];

swaggerAutogen(outputFile ,routes, doc);

/* PUT IN server.js

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

*/