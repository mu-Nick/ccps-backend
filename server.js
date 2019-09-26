const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {PORT} = require('./utils/config')

// The routes
const registerRouter = require('./controllers/registerRouter')
const loginRouter = require('./controllers/loginRouter')
const complaintRouter = require('./controllers/complaintRouter')


// Initialize the app
const app = express();

// Add middleware
app.use(bodyParser.json());
app.use(cors());

// Add routes
app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/complaint', complaintRouter)


// app.post("/signin", (req, res) => {
// 	signin.handleSignin(req, res);
// });

// app.get("/getcomps", (req, res) => {
// 	getcomps.sendComps(req, res);
// });

// app.put("/chstatus", (req, res) => {
// 	chstatus.handleStatus(req, res);
// });


// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
