import { TaskStatusEnum } from './../../../../../../core/enums/taskStatus.enum'
import { Task, UpdateTaskModel } from './../../../../../models/tasks.model'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() deleteTaskEvent = new EventEmitter<string>()
  @Output() updateTaskEvent = new EventEmitter<{ taskId: string; model: UpdateTaskModel }>()

  taskStatusEnum = TaskStatusEnum
  isTitleEdit = false
  newTitle = ''

  clickDeleteTask() {
    this.deleteTaskEvent.emit(this.task.id)
  }
  clickUpdateTask(patch: Partial<UpdateTaskModel>) {
    const model: UpdateTaskModel = {
      status: this.task.status,
      completed: this.task.completed,
      title: this.task.title,
      deadline: this.task.deadline,
      description: this.task.description,
      priority: this.task.priority,
      startDate: this.task.startDate,
      ...patch,
    }
    this.updateTaskEvent.emit({
      taskId: this.task.id,
      model,
    })
  }
  clickStatusUpdate(event: MouseEvent) {
    const newStatus = (event.currentTarget as HTMLInputElement).checked

    this.clickUpdateTask({
      status: newStatus ? this.taskStatusEnum.completed : this.taskStatusEnum.active,
    })
  }
  activateTitleEdit() {
    this.newTitle = this.task.title
    this.isTitleEdit = true
  }
  enterTitleEdit() {
    this.isTitleEdit = false
    this.clickUpdateTask({ title: this.newTitle })
  }
}
