import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Filter } from 'src/app/core/enums/filter.enum'

@Component({
  selector: 'tl-todo-filters',
  templateUrl: './todo-filters.component.html',
  styleUrls: ['./todo-filters.component.css'],
})
export class TodoFiltersComponent {
  filter = Filter
  @Input() todoFilter!: Filter
  @Output() changeFilterEvent = new EventEmitter<Filter>()

  clickFilterChange(filter: Filter) {
    this.changeFilterEvent.emit(filter)
  }
}
