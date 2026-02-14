import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from '../login/login.component'
import { RegisterComponent } from '../../register/register.component'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [
    CommonModule,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './auth-container.component.html'
})
export class AuthContainerComponent {

  showLogin = true   // 🔥 controls which form is shown

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // ✅ Already logged in → go directly to dashboard
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard'])
    }
  }

  // 🔁 switch to Register form
  switchToRegister() {
    console.log('➡️ switchToRegister called')
    this.showLogin = false
  }

  // 🔁 switch to Login form
  switchToLogin() {
    console.log('⬅️ switchToLogin called')
    this.showLogin = true
  }
}
