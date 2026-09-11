import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() switchToRegister = new EventEmitter<void>()

  email = ''
  password = ''

  loading = false
  errorMessage = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.loading = true
    this.errorMessage = ''

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: () => {
        // ✅ token AuthService me save ho chuka hai
        // ✅ direct dashboard redirect
        this.router.navigate(['/dashboard'])
      },
      error: (err: any) => {
        this.loading = false
        this.errorMessage =
          err?.error?.message || 'Login failed'
      },
      complete: () => {
        this.loading = false
      }
    })
  }

  onSwitch() {
    this.switchToRegister.emit()
  }
}
