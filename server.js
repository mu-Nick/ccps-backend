const express = require("express");

const app = express();

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
