const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {PORT} = require('./utils/config')

// The routes
const registerRouter = require('./controllers/registerRouter')


// Initialize the app
const app = express();

// Add middleware
app.use(bodyParser.json());
app.use(cors());

// Add routes
app.use('/register', registerRouter)


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
