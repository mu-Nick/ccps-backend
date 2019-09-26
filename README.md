# ccps-backend
This is the backend for the Campus Complaint Processing System

## Routes

### Register
- /register/student (POST)
- /register/department (POST)

### Login
- /login/student (POST)
- /login/department (POST)

### Student
- /student/:rollno/complaints (GET)

### Department
- /department/complaints (GET)

### Complaints
- /complaint (POST)
- /complaint/:id/supporters (POST)
- /complaint/:id/addsupporter (POST)
- /complaint/:id/changestatus (PUT)