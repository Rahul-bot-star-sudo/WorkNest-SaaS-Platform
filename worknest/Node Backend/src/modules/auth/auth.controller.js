// STEP 2: AUTH CONTROLLER
// HTTP handling only

const LoginDto = require('./dto/login.dto');
const AuthService = require('./auth.service');

class AuthController {

  // ================= LOGIN =================
  async login(req, res) {
    console.log('LOGIN API HIT');
    console.log('REQ BODY IN CONTROLLER:', req.body);

    try {
      // STEP 2.1: DTO build
      const dto = LoginDto(req.body);

      console.log('CALLING AUTH SERVICE...');

      // STEP 2.2: Service call
      const result = await AuthService.login(dto);

      // STEP 2.3: Refresh token cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: false, // localhost
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // STEP 2.4: Response
      return res.status(200).json({
        success: true,
        accessToken: result.accessToken,
        user: result.user
      });

    } catch (err) {
      console.error('LOGIN CONTROLLER ERROR:', err);

      return res.status(401).json({
        success: false,
        message: err.message || 'Login failed'
      });
    }
  }

  // ================= REGISTER =================
  async registerUser(req, res) {
    console.log('REGISTER API HIT');
    console.log('REQ BODY IN CONTROLLER:', req.body);
    console.log('LOGGED IN USER:', req.user);

    try {
      // TEMP response (sirf test ke liye)
      return res.status(201).json({
        success: true,
        message: 'Register user controller working'
      });

    } catch (err) {
      console.error('REGISTER CONTROLLER ERROR:', err);

      return res.status(400).json({
        success: false,
        message: err.message || 'Registration failed'
      });
    }
  }

}

module.exports = new AuthController();
