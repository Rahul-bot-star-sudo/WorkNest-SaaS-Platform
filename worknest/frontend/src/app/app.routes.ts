import { Routes } from '@angular/router'
import { AuthContainerComponent } from './auth/auth-container/auth-container.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { authGuard } from './guards/auth.guard'

export const routes: Routes = [

  // 🔓 AUTH (DEFAULT PAGE)
  {
    path: '',
    component: AuthContainerComponent
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
