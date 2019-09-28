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
- /student/:rollno/notifications (GET)

### Department
- /department/:deptid/complaints (GET)

### Complaints
- /complaint (POST)
- /complaint/:id/addsupporters (POST)
- /complaint/:id/confirmsupport (POST)
- /complaint/:id/changestatus (PUT)