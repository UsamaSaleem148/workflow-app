export interface WorkFlow {
  id: number
  name: string
  type: string
  parent_id: number | null
  child_id: number[] | null
  level: number
  initWorkflowId: number
}
