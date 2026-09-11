// STEP 1: LOGIN INPUT CONTRACT
// Controller ke raw req.body ko clean data me convert karta hai

module.exports = function LoginDto(data) {
  return {
    email: data.email?.toLowerCase(),   // STEP 1.1
    password: data.password,            // STEP 1.2
    deviceInfo: data.deviceInfo || null // STEP 1.3
  }
}
