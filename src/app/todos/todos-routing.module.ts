import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { TodosComponent } from './components/todos/todos.component'
/* pathMatch full, потому что у нас path '', и Ангуляру объясняем, что именно по этому пути рисуем тудулисты */
const routes: Routes = [{ path: '', component: TodosComponent, pathMatch: 'full' }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {}
