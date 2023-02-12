import { Filter } from './../../../../core/enums/filter.enum'
import { TodosService } from './../../../services/todos.service'
import { TasksService } from './../../../services/tasks.service'
import { MainTodo } from './../../../models/todos.model'
import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'tl-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  @Input() todo!: MainTodo
  @Output() deleteTodoEvent = new EventEmitter<string>()
  @Output() editTodoEvent = new EventEmitter<{ id: string; title: string }>()

  isTitleEdit = false
  newTitle = ''
  constructor(private todoService: TodosService) {}
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
  changeFilter(filter: Filter) {
    this.todoService.changeFilter({ filter, id: this.todo.id })
  }
}
