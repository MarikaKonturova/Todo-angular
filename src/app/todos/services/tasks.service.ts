import { CommonResponse } from './../../core/models/core.models'
import { GetTasksResponse, Task } from './../models/tasks.model'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable()
export class TasksService {
  constructor(private http: HttpClient) {}
  tasks$ = new BehaviorSubject<Task[]>([])
  getTasks(todoId: string) {
    return this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }
  addTask(data: { title: string; todoId: string }) {
    return this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseURL}/todo-lists/${data.todoId}/tasks`,
        { title: data.title }
      )
      .pipe(
        map(res => {
          const oldState = this.tasks$.getValue()
          const newTask = res.data.item
          return [newTask, ...oldState]
        })
      )
      .subscribe(tasks => {
        this.tasks$.next(tasks)
      })
  }
}
