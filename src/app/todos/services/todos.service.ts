import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, map } from 'rxjs'
import { Filter } from 'src/app/core/enums/filter.enum'
import { environment } from './../../../environments/environment'
import { CommonResponse } from './../../core/models/core.models'
import { MainTodo, Todo } from './../models/todos.model'
@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}
  todos$ = new BehaviorSubject<MainTodo[]>([])
  filter = Filter
  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseURL}/todo-lists`)
      .pipe(map(todos => todos.map(todo => ({ ...todo, filter: this.filter.all }))))
      .subscribe(todos => {
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
          return [{ ...newTodo, filter: this.filter.all }, ...oldTodos]
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
  changeFilter({ id, filter }: { id: string; filter: Filter }) {
    const oldTodos = this.todos$.getValue()
    const newTodos = oldTodos.map(todo => (todo.id === id ? { ...todo, filter } : todo))
    this.todos$.next(newTodos)
  }
}
