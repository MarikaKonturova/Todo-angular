import { BehaviorSubject } from 'rxjs'
import { Injectable } from '@angular/core'
import { Notify } from '../models/notify.models'

@Injectable()
export class NotificationService {
  notify$ = new BehaviorSubject<null | Notify>(null)

  handleError(message: string) {
    this.notify$.next({ severity: 'error', message })
  }
  handleSuccess(message: string) {
    this.notify$.next({ severity: 'success', message })
  }
  clear() {
    this.notify$.next(null)
  }
}
