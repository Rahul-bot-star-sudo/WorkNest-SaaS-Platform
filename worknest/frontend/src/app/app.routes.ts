import { Routes } from '@angular/router'
import { LoginComponent } from './auth/login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthContainerComponent } from './auth/auth-container/auth-container.component'

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '', component: AuthContainerComponent }
]
