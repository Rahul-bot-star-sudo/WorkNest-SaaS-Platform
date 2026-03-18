### API Design (using OpenAPI YAML)
---
```
openapi: 3.0.0
info:
  title: Create Super-Admin
  version: 1.0.0

paths:

  /api/v1/super-admin:
    post:
      summary: Create a new super-admin
      tags: [SuperAdmin]

      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateSuperAdminRequest'

      responses:

        '201':
          description: Super-Admin created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'

        '400':
          description: Bad Request (Invalid input)

        '401':
          description: Unauthorized (Token missing or invalid)

        '403':
          description: Forbidden (Not allowed to create super-admin)

        '409':
          description: Conflict (Super-admin already exists)

        '500':
          description: Internal Server Error

components:

  schemas:

    CreateSuperAdminRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          example: admin@example.com
        password:
          type: string
          example: strongpassword123

    User:
      type: object
      properties:
        id:
          type: integer
          example: 1
        email:
          type: string
          example: admin@example.com
        role:
          type: string
          example: SUPER_ADMIN
```