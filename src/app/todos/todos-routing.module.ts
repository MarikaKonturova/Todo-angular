import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '../core/guards/auth.guard'
import { TodosComponent } from './components/todos/todos.component'
/* pathMatch full, потому что у нас path '', и Ангуляру объясняем, что именно по этому пути рисуем тудулисты */
const routes: Routes = [
  { path: '', component: TodosComponent, pathMatch: 'full', canActivate: [AuthGuard] },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
