### Algorithm
---
1. client send request
2. controller handle request 
3. check super admin is create or not 
4. if super admin create
   1. send response super admin is already created
5. else super admin is not created 
   1. create super admin 
   2. send response super admin created successfully
---
1. Client sends POST request (/setup/super-admin)

2. Controller receives request

3. Validate request (optional - name, email, password)

4. Call Service Layer

5. Service Layer:
   5.1 Check in DB → is super admin already exists?
        - Query: SELECT * FROM users WHERE role = 'SUPER_ADMIN'

   5.2 If exists:
        - Throw Business Exception (SuperAdminAlreadyExistsException)

   5.3 Else:
        - Encrypt password (BCrypt)
        - Create Super Admin object
        - Save to DB

6. Return proper HTTP response:
   - 201 CREATED (success)
   - 409 CONFLICT (already exists)

7. Log important events