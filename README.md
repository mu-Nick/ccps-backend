# ccps-backend
This is the backend for the Campus Complaint Processing System

## Routes

### Register
- /register/student
- /register/department

### Login
- /login/student
- /login/department

### Student
- /student/:rollno/complaints

### Department
- /department/complaints

### Complaints
- /complaint
- /complaint/:id/supporters
- /complaint/:id/addsupporter
- /complaint/:id/changestatus (PUT)