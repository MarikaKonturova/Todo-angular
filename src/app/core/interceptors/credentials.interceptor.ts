import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: new HttpHeaders().append('api-key', environment.apiKey),
      withCredentials: true,
    })
    return next.handle(request)
  }
}
