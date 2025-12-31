import { Component } from '@angular/core'
import { RegisterComponent } from './register/register.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {}
