import { Routes } from '@angular/router'
import { AuthContainerComponent } from './auth/auth-container/auth-container.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { authGuard } from './guards/auth.guard'
import { model } from '@angular/core'
import { Register } from './first-module/register/register'

export const routes: Routes = [

  // 🔓 AUTH (DEFAULT PAGE)
  {
    path: '',
    component: AuthContainerComponent
  },
  // First module 
  {
    path:'register', 
    component: Register

  },

  // 🔐 DASHBOARD (PROTECTED)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  },

  // ❓ FALLBACK (OPTIONAL BUT SAFE)
  {
    path: '**',
    redirectTo: ''
  }
]
