import { ResultCode } from '../enums/resultCode.enum'
import { CommonResponse } from '../models/core.models'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { loginData, MeResponse } from 'src/app/core/models/auth.models'

@Injectable()
export class AuthService {
  isAuth = false
  resultCode = ResultCode
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(res => {
    this.resolveAuthRequest = res
  })

  constructor(private http: HttpClient, private router: Router) {}

  login(data: Partial<loginData>) {
    this.http.post<CommonResponse>(`${environment.baseURL}/auth/login`, data).subscribe(res => {
      if (res.resultCode === this.resultCode.success) {
        this.router.navigate(['/'])
      }
    })
  }
  logout() {
    this.http.delete<CommonResponse>(`${environment.baseURL}/auth/login`).subscribe(res => {
      if (res.resultCode === this.resultCode.success) {
        this.router.navigate(['/login'])
      }
    })
  }
  me() {
    this.http.get<CommonResponse<MeResponse>>(`${environment.baseURL}/auth/me`).subscribe(res => {
      if (res.resultCode == this.resultCode.success) {
        this.isAuth = true
      }

      this.resolveAuthRequest()
    })
  }
}
