import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔥 ngModel ke liye
  templateUrl: './register.component.html'
})
export class RegisterComponent {

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
        this.successMessage = res.message
        this.errorMessage = ''
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Registration failed'
        this.successMessage = ''
      }
    })
  }
}
