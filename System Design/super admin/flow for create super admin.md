```
Frontend/Postman
        ↓
POST /api/auth/super-admin/register
        ↓
Controller
        ↓
Service
   check email
   encrypt password
   create user
        ↓
Repository
        ↓
Database save
        ↓
Response return
```