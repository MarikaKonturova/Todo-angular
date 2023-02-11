import { Todo } from './../models/todos.model'
import { environment } from './../../../environments/environment'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
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
}
