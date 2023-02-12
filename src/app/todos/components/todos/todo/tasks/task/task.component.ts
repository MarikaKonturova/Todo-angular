import { Task } from './../../../../../models/tasks.model'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'tl-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  @Input() task!: Task
}
