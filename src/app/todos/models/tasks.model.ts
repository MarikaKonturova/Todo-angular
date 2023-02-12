export interface Task extends UpdateTaskModel {
  id: string
  todolistId: string
  order: number
  addedDate: string
}

export interface GetTasksResponse {
  items: Task[]
  totalCount: number
  error: string
}
export interface DomainTask {
  [key: string]: Task[]
}
export interface UpdateTaskModel {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date
}
