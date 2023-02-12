import { CommonResponse } from './../../core/models/core.models'
import { DomainTask, GetTasksResponse, Task } from './../models/tasks.model'
import { BehaviorSubject, map, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  tasks$ = new BehaviorSubject<DomainTask>({})
  getTasks(todoId: string) {
    return this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
      .subscribe(tasks => {
        const tasksState = this.tasks$.getValue()
        tasksState[todoId] = tasks
        this.tasks$.next(tasksState)
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
          const tasksState = this.tasks$.getValue()
          const newTask = res.data.item
          tasksState[data.todoId] = [newTask, ...tasksState[data.todoId]]
          return tasksState
        })
      )
      .subscribe(tasksState => {
        this.tasks$.next(tasksState)
      })
  }
}
