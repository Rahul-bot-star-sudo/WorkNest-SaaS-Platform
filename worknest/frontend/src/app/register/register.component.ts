import { Component } from '@angular/core'
import { AuthService } from '../services/auth'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email: string = ''
  password: string = ''

  successMessage: string = ''
  errorMessage: string = ''
  loading: boolean = false

  constructor(private auth: AuthService) {}

  // ✅ API CALL HAMESHA METHOD KE ANDAR
  register() {
    this.successMessage = ''
    this.errorMessage = ''
    this.loading = true

    this.auth.register({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res: any) => {
        this.successMessage = 'User registered successfully ✅'
        this.loading = false
      },
      error: (err: any) => {
        this.errorMessage =
          err?.error?.message || 'Registration failed'
        this.loading = false
      },
      complete: () => {
        // safety fallback
        this.loading = false
      }
    })
  }
}
