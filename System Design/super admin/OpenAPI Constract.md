```
openapi: 3.0.0
info:
  title: WorkNest API
  version: 1.0.0
  description: API documentation for WorkNest project

paths:
  /super-admin/register:
    post:
      summary: Register Super Admin
      description: This API registers a new super admin in the system
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                email:
                  type: string
                  example: admin@worknest.com
                password:
                  type: string
                  example: 123456
      responses:
        "201":
          description: Super admin registered successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Super admin register successfully
        "400":
          description: Bad request
```