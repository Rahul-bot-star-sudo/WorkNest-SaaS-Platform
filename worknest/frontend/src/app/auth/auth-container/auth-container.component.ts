import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoginComponent } from '../login/login.component'
import { RegisterComponent } from '../../register/register.component'

@Component({
  selector: 'app-auth-container',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth-container.component.html'
})
export class AuthContainerComponent {

  showLogin: boolean = true   // 🔥 MUST

  switchToRegister() {
    console.log('➡️ switchToRegister called')
    this.showLogin = false
  }

  switchToLogin() {
    console.log('⬅️ switchToLogin called')
    this.showLogin = true
  }
}
