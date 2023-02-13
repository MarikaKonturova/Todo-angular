import { ResultCode } from './../../core/enums/resultCode.enum'
import { CommonResponse } from './../../core/models/core.models'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    this.http.post<CommonResponse>(`${environment.baseURL}/auth/login`, data).subscribe(res => {
      if (res.resultCode === ResultCode.success) {
        this.router.navigate(['/'])
      }
    })
  }
  logout() {
    this.http.delete<CommonResponse>(`${environment.baseURL}/auth/login`).subscribe(res => {
      if (res.resultCode === ResultCode.success) {
        this.router.navigate(['/login'])
      }
    })
  }
  me() {
    this.http.get(`${environment.baseURL}/auth/login`)
  }
  //
}
