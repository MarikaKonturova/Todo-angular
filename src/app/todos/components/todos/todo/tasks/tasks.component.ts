import { map, Observable } from 'rxjs'
import { TasksService } from './../../../../services/tasks.service'
import { Component, Input, OnInit } from '@angular/core'
import { Task, UpdateTaskModel } from 'src/app/todos/models/tasks.model'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId = ''
  taskTitle = ''
  tasks$!: Observable<Task[]>
  constructor(private tasksService: TasksService) {}
  ngOnInit(): void {
    this.tasks$ = this.tasksService.tasks$.pipe(map(tasks => tasks[this.todoId]))
    this.tasksService.getTasks(this.todoId)
  }

  addTask() {
    this.tasksService.addTask({ title: this.taskTitle, todoId: this.todoId })
    this.taskTitle = ''
  }
  deleteTask(id: string) {
    this.tasksService.deleteTask({ id, todoId: this.todoId })
  }
  updateTask(data: { taskId: string; model: UpdateTaskModel }) {
    this.tasksService.updateTask({ ...data, todoId: this.todoId })
  }
}
