import { Component, EventEmitter, Output } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // 🔁 switch signal to parent
  @Output() switchToRegister = new EventEmitter<void>()

  email: string = ''
  password: string = ''

  loading: boolean = false
  successMessage: string = ''
  errorMessage: string = ''

  constructor(private http: HttpClient) {}

  login() {
    this.loading = true
    this.successMessage = ''
    this.errorMessage = ''

    this.http.post<any>('http://localhost:3000/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        this.successMessage = 'Login successful ✅'
        this.loading = false
        localStorage.setItem('token', res.data.token)
      },
      error: (err) => {
        this.errorMessage =
          err?.error?.message || 'Login failed'
        this.loading = false
      }
    })
  }

  // 🔁 manual switch (link click)
  
onSwitch() {
  console.log('📤 emitting switchToRegister')
  this.switchToRegister.emit()
}

}
