import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuthService {

  private API = 'http://localhost:3000/auth'

  constructor(private http: HttpClient) {}

  // 🔐 LOGIN
  login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.API}/login`, data).pipe(
      tap(res => {
        localStorage.setItem('ACCESS_TOKEN', res.data.accessToken)
        localStorage.setItem('REFRESH_TOKEN', res.data.refreshToken)
      })
    )
  }

  // 🔁 REFRESH TOKEN
  refreshToken() {
    const refreshToken = localStorage.getItem('REFRESH_TOKEN')

    return this.http.post<any>(`${this.API}/refresh`, { refreshToken }).pipe(
      tap(res => {
        localStorage.setItem('ACCESS_TOKEN', res.data.accessToken)
      })
    )
  }

  // 🎟️ GET ACCESS TOKEN
  getAccessToken(): string | null {
    return localStorage.getItem('ACCESS_TOKEN')
  }

  // 🚪 LOGOUT (SINGLE, CORRECT)
  logout(): void {
    localStorage.removeItem('ACCESS_TOKEN')
    localStorage.removeItem('REFRESH_TOKEN')
  }

  // ✅ AUTH CHECK
  isLoggedIn(): boolean {
    return !!this.getAccessToken()
  }
}
