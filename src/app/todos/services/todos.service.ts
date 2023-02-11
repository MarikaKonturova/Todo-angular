import { CommonResponse } from './../../core/models/core.models'
import { Todo } from './../models/todos.model'
import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, map } from 'rxjs'
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}
  todos$ = new BehaviorSubject<Todo[]>([])
  getTodos() {
    this.http.get<Todo[]>(`${environment.baseURL}/todo-lists`).subscribe(todos => {
      this.todos$.next(todos)
    })
  }
  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(`${environment.baseURL}/todo-lists`, { title })
      .pipe(
        map(res => {
          const oldTodos = this.todos$.getValue()
          const newTodo = res.data.item
          return [newTodo, ...oldTodos]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
  deleteTodo(id: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseURL}/todo-lists/${id}`)
      .pipe(
        map(() => {
          const oldTodos = this.todos$.getValue()
          return oldTodos.filter(todo => todo.id !== id)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
  updateTodoTitle({ id, title }: { id: string; title: string }) {
    this.http
      .put<CommonResponse>(`${environment.baseURL}/todo-lists/${id}`, { title })
      .pipe(
        map(() => {
          const oldTodos = this.todos$.getValue()
          return oldTodos.map(todo => (todo.id === id ? { ...todo, title } : todo))
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
}
