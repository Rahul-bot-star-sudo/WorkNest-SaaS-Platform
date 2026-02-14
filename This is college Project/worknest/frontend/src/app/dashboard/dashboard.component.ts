import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <h2>Dashboard</h2>
    <button (click)="logout()">Logout</button>
  `
})
export class DashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
