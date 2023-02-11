import { Todo } from './../../../models/todos.model'
import { Component, Input } from '@angular/core'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: Todo
}
