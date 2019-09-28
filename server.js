const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {PORT} = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

// The routes
const registerRouter = require('./controllers/registerRouter')
const loginRouter = require('./controllers/loginRouter')
const complaintRouter = require('./controllers/complaintRouter')
const studentRouter = require('./controllers/studentRouter')
const departmentRouter = require('./controllers/departmentRouter')


// Initialize the app
const app = express();

// Add middleware
app.use(bodyParser.json());
app.use(cors());
app.use(middleware.requestLogger)

// Add routes
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/complaint', complaintRouter)
app.use('/student', studentRouter)
app.use('/department', departmentRouter)

// Error on Unknown routes
app.use(middleware.uknownEndpoint)


// Starting the server
app.listen(PORT, () => {
	logger.logger(`Server running on port ${PORT}`);
});
