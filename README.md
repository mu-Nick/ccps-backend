
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

    - /complaint/:id/pending (PUT)

    - /complaint/:id/markresolved (PUT)

    - /complaint/:id/resolved (PUT)

## Database Schema
We have used PostgreSQL as the database

### Students :
|Column|Type  |
|--|--|
| Roll | Integer |
| Name | Varchar |
| Email | Varchar |
| Hash | Varchar |
| Notifications | JSON |

### Departments :
|Column|Type  |
|--|--|
| ID | Varchar |
| Name | Varchar |
| Email | Varchar |
| Hash | Varchar |

### Complaints :
|Column|Type  |
|--|--|
| ID | Integer |
| Subject | Varchar |
| Description | Varchar |
| RollNo | Integer |
| DeptID | Varchar |
| Time | Timestamp |
| Status | Varchar |
| Supporters | JSON |





