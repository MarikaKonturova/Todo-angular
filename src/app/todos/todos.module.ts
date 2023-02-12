import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { TodosRoutingModule } from './todos-routing.module'
import { TodosComponent } from './components/todos/todos.component'
import { TodoComponent } from './components/todos/todo/todo.component'
import { FormsModule } from '@angular/forms';
import { TasksComponent } from './components/todos/todo/tasks/tasks.component';
import { TaskComponent } from './components/todos/todo/tasks/task/task.component'

@NgModule({
  declarations: [TodosComponent, TodoComponent, TasksComponent, TaskComponent],
  imports: [CommonModule, TodosRoutingModule, FormsModule],
})
export class TodosModule {}
