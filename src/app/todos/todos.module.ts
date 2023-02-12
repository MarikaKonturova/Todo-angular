import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './components/todos/todos.component'
import { TodoComponent } from './components/todos/todo/todo.component'
import { FormsModule } from '@angular/forms'
import { TasksComponent } from './components/todos/todo/tasks/tasks.component'
import { TaskComponent } from './components/todos/todo/tasks/task/task.component'
import { TodoFiltersComponent } from './components/todos/todo/todo-filters/todo-filters.component'
import { TodoFooterComponent } from './components/todos/todo/todo-footer/todo-footer.component'

@NgModule({
  declarations: [
    TodosComponent,
    TodoComponent,
    TasksComponent,
    TaskComponent,
    TodoFiltersComponent,
    TodoFooterComponent,
  ],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
})
export class TodosModule {}
