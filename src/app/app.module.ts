import { SharedModule } from './shared/shared.module'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { TodosModule } from './todos/todos.module'
import { AuthModule } from './auth/auth.module'
import { AppRoutingModule } from './app-routing-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TodosModule,
    AuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
