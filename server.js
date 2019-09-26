const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize the app
const app = express();

// Add middleware
app.use(bodyParser.json());
app.use(cors());

// Add routes


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
app.listen(3000, () => {
	console.log("app is running on port 3000");
});
