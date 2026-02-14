// src/modules/secure/secure.controller.ts

import { SecureService } from './secure.service'

export class SecureController {

  private service = new SecureService()

  getSecureData(req: any, res: any) {

    // STEP 1: user middleware se aata hai
    const user = req.user

    // STEP 2: service call
    const result = this.service.getData(user)

    // STEP 3: response
    return res.status(200).json({
      message: 'Secure data accessed',
      data: result
    })
  }
}
