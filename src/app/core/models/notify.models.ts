type SeveretyType = 'success' | 'error' | 'info'
export interface Notify {
  message: string
  severity: SeveretyType
}
