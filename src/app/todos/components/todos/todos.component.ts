import { AuthService } from './../../../auth/services/auth.service'
import { MainTodo, Todo } from './../../models/todos.model'
import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core'
import { TodosService } from '../../services/todos.service'
import { Filter } from 'src/app/core/enums/filter.enum'

@Component({
  selector: 'tl-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  providers: [AuthService],
})
export class TodosComponent implements OnInit {
  todos$!: Observable<MainTodo[]>
  todoTitle = ''
  constructor(private todosService: TodosService, private authService: AuthService) {}

  ngOnInit(): void {
    this.todos$ = this.todosService.todos$
    this.todosService.getTodos()
  }
  addTodo() {
    this.todosService.addTodo(this.todoTitle)
    this.todoTitle = ''
  }
  deleteTodo(id: string) {
    this.todosService.deleteTodo(id)
  }
  updateTodo(data: { id: string; title: string }) {
    this.todosService.updateTodoTitle(data)
  }
  logout() {
    this.authService.logout()
  }
}
