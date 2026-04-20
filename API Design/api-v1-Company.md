
```

openapi: 3.0.1

info:
  title: WorkNest Company API
  description: API for creating company (Only SUPER_ADMIN allowed)
  version: 1.0.0

servers:
  - url: http://localhost:8080/api/v1

paths:

  /company:
    post:
      summary: Create company
      description: Create a new company (Accessible only by SUPER_ADMIN)
      
      security:
        - bearerAuth: []

      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CompanyRequest'

      responses:
        '201':
          description: Company created successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SuccessResponse'

        '401':
          description: Unauthorized (Invalid or missing JWT)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

        '403':
          description: Forbidden (User is not SUPER_ADMIN)
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

        '409':
          description: Company already exists
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

components:

  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  schemas:

    CompanyRequest:
      type: object
      required:
        - name
      properties:
        name:
          type: string
          example: ABC Pvt Ltd

    SuccessResponse:
      type: object
      properties:
        status:
          type: string
          example: success
        message:
          type: string
          example: Company created successfully

    ErrorResponse:
      type: object
      properties:
        status:
          type: string
          example: error
        message:
          type: string
          example: Company already exists
          
```