// src/modules/auth/auth.config.ts

/*
🧠 ALGORITHM

STEP 1: Define default role for new users
DEFAULT_ROLE = MEMBER

STEP 2: Define default status for new users
DEFAULT_STATUS = ACTIVE

NOTE:
- Hard-coded values allowed
- Used during user registration
- Keeps service logic clean
*/

export const AuthConfig = {
  // default role assigned during registration
  DEFAULT_ROLE: 'MEMBER',

  // default user status
  DEFAULT_STATUS: 'ACTIVE'
}
