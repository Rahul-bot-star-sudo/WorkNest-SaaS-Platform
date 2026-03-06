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

# OpenAPI Contract

**Requirements :-**
  * /super-admin/register
    * POST
      * Desc : register Super-Admin
      * Request Body : { email : String, Password : String }
      * Response Structure : { Super admin register successfully }
  * /user/login   
    * POST
      * Desc :
      * Request Body :
      * Response Structure : { user login successfully } 
