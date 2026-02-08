// name
// email
// password

// setup-super-admin.dto.js
class SetupSuperAdminDto {
  constructor(name, email, password) {
    // full name of super admin
    this.name = name

    // email address
    this.email = email

    // plain password (will be hashed later)
    this.password = password
  }
}

module.exports = SetupSuperAdminDto
