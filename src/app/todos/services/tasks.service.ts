import { GetTasksResponse, Task } from './../models/tasks.model'
import { map, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}
  getTasks(todoId: string): Observable<Task[]> {
    return this.http
      .get<GetTasksResponse>(`${environment.baseURL}/todo-lists/${todoId}/tasks`)
      .pipe(map(res => res.items))
  }
}
