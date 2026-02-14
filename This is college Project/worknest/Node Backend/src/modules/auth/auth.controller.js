// ================= AUTH CONTROLLER =================
// HTTP handling only

const LoginDto = require('./dto/login.dto');
const AuthService = require('./auth.service');
const jwt = require("jsonwebtoken");


class AuthController {

  // ================= LOGIN =================
  async login(req, res) {
    console.log('LOGIN API HIT');
    console.log('REQ BODY IN CONTROLLER:', req.body);

    try {

      const dto = LoginDto(req.body);

      const result = await AuthService.login(dto);

      // Save refresh token in HTTP-only cookie
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true,
        secure: false, // change to true in production
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

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

    try {
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

  // ================= REFRESH TOKEN =================
  async refreshToken(req, res) {

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token"
      });
    }

    try {

      // 1️⃣ Verify token signature
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      );

      // 2️⃣ Check token exists in DB
      const user = await User.findById(decoded.userId);

      if (!user || user.refreshToken !== refreshToken) {
        return res.status(403).json({
          success: false,
          message: "Invalid refresh token"
        });
      }

      // 3️⃣ Generate new access token
      const newAccessToken = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          priority: user.priority
        },
        process.env.ACCESS_SECRET,
        { expiresIn: "15m" }
      );

      return res.status(200).json({
        success: true,
        accessToken: newAccessToken
      });

    } catch (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired refresh token"
      });
    }
  }

}

module.exports = new AuthController();
