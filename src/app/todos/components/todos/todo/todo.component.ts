import { Todo } from './../../../models/todos.model'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: Todo
  @Output() deleteTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ id: string; title: string }>()

  isTitleEdit = false
  newTitle = ''

  clickDeleteTodo() {
    this.deleteTodoEvent.emit(this.todo.id)
  }
  activateTitleEdit() {
    this.newTitle = this.todo.title
    this.isTitleEdit = true
  }
  blurTitleEdit() {
    this.isTitleEdit = false
    this.editTodoEvent.emit({ id: this.todo.id, title: this.newTitle })
  }
}
