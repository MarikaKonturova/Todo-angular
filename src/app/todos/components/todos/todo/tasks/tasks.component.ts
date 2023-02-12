import { TodosService } from './../../../../services/todos.service'
import { combineLatest, map, Observable } from 'rxjs'
import { TasksService } from './../../../../services/tasks.service'
import { Component, Input, OnInit } from '@angular/core'
import { Task, UpdateTaskModel } from 'src/app/todos/models/tasks.model'
import { Filter } from 'src/app/core/enums/filter.enum'
import { TaskStatusEnum } from 'src/app/core/enums/taskStatus.enum'

@Component({
  selector: 'tl-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() todoId = ''
  taskTitle = ''
  tasks$!: Observable<Task[]>
  constructor(private tasksService: TasksService, private todosService: TodosService) {}
  ngOnInit(): void {
    this.tasks$ = combineLatest([this.tasksService.tasks$, this.todosService.todos$]).pipe(
      map(res => {
        const tasks = res[0][this.todoId]
        const todo = res[1].find(tl => tl.id === this.todoId)
        let filteredTasks = tasks
        if (todo?.filter !== 'all') {
          filteredTasks = tasks.filter(tk => {
            const status =
              todo?.filter === Filter.active ? TaskStatusEnum.active : TaskStatusEnum.completed
            return tk.status === status
          })
        }
        return filteredTasks
      })
    )
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
