openapi: 3.0.1

info:
  title: WorkNest Auth API
  description: Role-Based Authentication API (Admin / Manager)
  version: 1.0.0

servers:
  - url: http://localhost:8080/api/v1

paths:

  /auth/login:
    post:
      summary: Login user
      description: Authenticate user and return JWT token
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'

      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/AuthResponse'

        '401':
          description: Invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

components:

  schemas:

    LoginRequest:
      type: object
      required:
        - email
        - password
      properties:
        email:
          type: string
          example: rahul@gmail.com
        password:
          type: string
          example: 123456

    AuthResponse:
      type: object
      properties:
        status:
          type: string
          example: success
        message:
          type: string
          example: Login successful
        data:
          type: object
          properties:
            token:
              type: string
              example: jwt_token_here
            role:
              type: string
              example: ADMIN

    ErrorResponse:
      type: object
      properties:
        status:
          type: string
          example: error
        message:
          type: string
          example: Invalid credentials