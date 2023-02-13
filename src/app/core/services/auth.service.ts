import { ResultCode } from '../enums/resultCode.enum'
import { CommonResponse } from '../models/core.models'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'
import { loginData, MeResponse } from 'src/app/core/models/auth.models'
import { catchError, EMPTY } from 'rxjs'
import { NotificationService } from './notification.service'

@Injectable()
export class AuthService {
  isAuth = false
  resultCode = ResultCode
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
  resolveAuthRequest: Function = () => {}
  authRequest = new Promise(res => {
    this.resolveAuthRequest = res
  })

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  login(data: Partial<loginData>) {
    this.http
      .post<CommonResponse>(`${environment.baseURL}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === this.resultCode.success) {
          this.router.navigate(['/'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }
  logout() {
    this.http
      .delete<CommonResponse>(`${environment.baseURL}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode === this.resultCode.success) {
          this.router.navigate(['/login'])
        } else {
          this.notificationService.handleError(res.messages[0])
        }
      })
  }
  me() {
    this.http
      .get<CommonResponse<MeResponse>>(`${environment.baseURL}/auth/me`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(res => {
        if (res.resultCode == this.resultCode.success) {
          this.isAuth = true
        } else {
          this.notificationService.handleError(res.messages[0])
        }

        this.resolveAuthRequest()
      })
  }
  private errorHandler(err: HttpErrorResponse) {
    this.notificationService.handleError(err.message)
    return EMPTY
  }
}
