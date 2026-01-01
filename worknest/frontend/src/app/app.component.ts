import { Component } from '@angular/core'
import { AuthContainerComponent } from './auth/auth-container/auth-container.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AuthContainerComponent],
  template: `<app-auth-container></app-auth-container>`
})
export class AppComponent {}
