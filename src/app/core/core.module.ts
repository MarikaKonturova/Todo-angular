import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CoreRoutingModule } from './core-routing.module'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { CredentialsInterceptor } from './interceptors/credentials.interceptor'

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true }],
})
export class CoreModule {}
