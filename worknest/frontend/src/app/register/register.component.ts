import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  // 🔁 switch signal to parent
  @Output() switchToLogin = new EventEmitter<void>()

  email = ''
  password = ''

  successMessage = ''
  errorMessage = ''

  constructor(private http: HttpClient) {}

  register() {
    this.http.post<any>('http://localhost:3000/auth/register', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.successMessage = res.message || 'Registration successful ✅'
        this.errorMessage = ''

        // 🔁 auto switch to login after success
        setTimeout(() => {
          this.switchToLogin.emit()
        }, 1000)
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed'
        this.successMessage = ''
      }
    })
  }

  // 🔁 manual switch (link click)
  onSwitch() {
    this.switchToLogin.emit()
  }
}
