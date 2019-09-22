const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
	console.log("app is running on port 3000");
});

/*
*Basic Functionalities*

/signin --> GET = user + approval req

/newcomp --> POST = complain

/viewcomp --> GET = complain + status

/chstatus --> POST = complain

/deptcomplains --> GET = complains

*/

/*
*DATABASES*

-->students
-->departments
-->signin
-->complains


*/
