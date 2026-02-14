import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService)
  const router = inject(Router)

  // ✅ logged in → allow dashboard
  if (authService.isLoggedIn()) {
    return true
  }

  // ❌ not logged in → go to login page
  router.navigate(['/'])
  return false
}
