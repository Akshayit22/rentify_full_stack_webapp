const swaggerAutogen = require( 'swagger-autogen' )();

const doc = {
	info: {
		title: 'rentify full stack Application system with MERN stack',
		description: 'Tech stack : REACT.JS , NODE.JS , EXPRESS.JS, MONGODB, TAILWINDCSS '
	},
	host: "https://rentify-full-stack-webapp.onrender.com/api/v1/"
	// host:'localhost:3000/api/v1/'
};

const outputFile = './swagger-output.json';
const routes = [ './routes/Property.js', './routes/User.js' ];

swaggerAutogen( outputFile, routes, doc );

/* PUT IN server.js

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

*/