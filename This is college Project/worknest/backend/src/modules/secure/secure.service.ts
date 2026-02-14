// src/modules/secure/secure.service.ts

export class SecureService {

  getData(user: any) {

    // STEP 1: business logic only
    // (auth / role yahan nahi)

    return {
      userId: user.userId,
      role: user.role,
      secret: 'This is protected information'
    }
  }
}
