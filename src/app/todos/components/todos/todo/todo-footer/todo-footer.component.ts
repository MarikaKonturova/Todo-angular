import { Component, Input } from '@angular/core'

@Component({
  selector: 'tl-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css'],
})
export class TodoFooterComponent {
  @Input() addedDate!: Date
}
