const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const database = require("./config/database");
const header_middleware = require("./middlewares/header");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;
database.connect();

app.use(express.json());
app.use(header_middleware);
app.use(cookieParser());
app.use(cors());

app.options("*", cors());



/* Routes defining */

const userRoutes = require("./routes/User");
app.use("/api/v1/auth", userRoutes);

const propertyRoutes = require("./routes/Property");
app.use("/api/v1/property",propertyRoutes);



app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Blog App API",
  });
  res.end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
