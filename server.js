const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const signin = require("./Controllers/signin");
const getcomps = require("./Controllers/getcomps");
const chstatus = require("./Controllers/chstatus");
const registerStudent = require('./Controllers/registerStudent')
const studentRoute = require('./Controllers/studentRoute')


const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
	signin.handleSignin(req, res);
});

app.get("/getcomps", (req, res) => {
	getcomps.sendComps(req, res);
});

app.put("/chstatus", (req, res) => {
	chstatus.handleStatus(req, res);
});
registerStudent(app)
studentRoute(app)

app.listen(3000, () => {
	console.log("app is running on port 3000");
});

/*
*Basic Functionalities*

/signin --> POST = user + approval req

/newcomp --> POST = complain

/viewcomp --> GET = complain + status

/chstatus --> PUT = complain

/deptcomplains --> GET = complains

*/

/*
*DATABASES*

-->students
-->departments
-->signin
-->complains


*/
