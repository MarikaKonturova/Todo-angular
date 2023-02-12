import { Filter } from './../../core/enums/filter.enum'
export interface Todo {
  id: string
  title: string
  addedDate: Date
  order: number
}
export interface MainTodo extends Todo {
  filter: Filter
}
