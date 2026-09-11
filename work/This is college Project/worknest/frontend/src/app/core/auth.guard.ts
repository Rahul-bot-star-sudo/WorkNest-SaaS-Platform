import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}
  canActivate(): boolean | UrlTree {

    // ✅ user logged in → allow
    if (this.auth.isLoggedIn()) {
      return true
    }

    // ❌ not logged in → redirect to login
    return this.router.createUrlTree(['/login'])
  }
}
