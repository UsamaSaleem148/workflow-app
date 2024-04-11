'use client'
import { WorkFlow } from '@/app/Models/WorkFlowModel'
import workflowApi from '@/app/apis/workflowApi'
import { useCallback, useEffect, useState } from 'react'

interface PageProps {
  params: {
    id: string
  }
}

function WorkflowDiagram({ params }: PageProps) {
  const [workflows, setWorkflows] = useState<WorkFlow[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  const fetchWorkflow = useCallback(async () => {
    const data = await workflowApi.fetchAllWorkFlowsById(parseInt(params.id))
    if (data.workflow !== null && data.workflow.length > 0) {
      data.workflow.sort((a: WorkFlow, b: WorkFlow) => a.level - b.level)
    }
    setWorkflows(data.workflow)
  }, [params.id])

  useEffect(() => {
    if (workflows === null || workflows.length === 0) {
      fetchWorkflow()
    }
  }, [fetchWorkflow, workflows])

  const createLines = useCallback(async () => {
    for (const workflow of workflows) {
      if (workflow.child_id === null) continue
      let childIds = JSON.parse(workflow.child_id.toString())
      const box1 = document.getElementById('box' + workflow.id)
      for (let i = 0; i < childIds.length; i++) {
        const box2 = document.getElementById('box' + childIds[i])
        console.log(childIds[i])
        const line1 = document.createElement('hr')

        const box1Rect = box1?.getBoundingClientRect()
        const box2Rect = box2?.getBoundingClientRect()
        if (box1Rect && box1Rect !== null && box2Rect && box2Rect !== null) {
          const lineX1 = box1Rect.left + box1Rect.width / 2
          const lineY1 = box1Rect.bottom

          const lineX2 = box2Rect.left + box2Rect.width / 2
          const lineY2 = box2Rect.top

          line1.style.left = lineX1 + 'px'
          line1.style.top = lineY1 + 'px'
          line1.style.height = Math.sqrt(Math.pow(lineX2 - lineX1, 2) + Math.pow(lineY2 - lineY1, 2)) + 'px'
          line1.style.transformOrigin = '0 0'
          line1.style.transform = `rotate(${Math.atan2(lineY2 - lineY1, lineX2 - lineX1)}rad)`
          line1.style.position = 'absolute'
          line1.style.width = '2px'
          line1.style.backgroundColor = 'black'
          document.getElementById('workflowDiagram')?.appendChild(line1)
        }
      }
    }
  }, [workflows])

  const createElements = useCallback(async (name: string, type: string, id: number, lastXPos: string, lastYPos: string) => {
    const circle = document.createElement('div')

    circle.style.width = '100px'
    circle.style.height = '100px'

    const p = document.createElement('p')
    p.textContent = name
    if (type === 'condition') {
      circle.style.borderRadius = '0%'
      circle.style.backgroundColor = '#c6def0'
      circle.style.transform = 'rotate(45deg)'
      p.style.transform = 'rotate(-45deg)'
    } else if (type === 'action') {
      circle.style.borderRadius = '0%'
      circle.style.backgroundColor = '#ffe195'
    } else {
      circle.style.backgroundColor = type === 'endBox' ? '#ee8e90' : '#aad2a1'
      circle.style.borderRadius = '50%'
    }
    circle.style.position = 'absolute'
    circle.style.textAlign = 'center'
    circle.style.display = 'flex'
    circle.style.justifyContent = 'center'
    circle.style.alignItems = 'center'
    circle.id = 'box' + id

    circle.style.left = lastXPos + 'px'
    circle.style.top = lastYPos + 'px'

    circle.appendChild(p)

    document.getElementById('workflowDiagram')?.appendChild(circle)
  }, [])

  useEffect(() => {
    if (workflows && workflows !== null && workflows.length > 0) {
      let lastLevel = 0
      let lastXPos = 0
      let lastYPos = 0
      for (const workflow of workflows) {
        if (workflow.level === 0) {
          lastXPos = window.innerWidth / 2 - 50
          lastYPos = 0
          createElements(workflow.name, workflow.type, workflow.id, lastXPos.toString(), lastYPos.toString())
        } else if (workflow.level !== lastLevel) {
          lastYPos = lastYPos + 200
          lastXPos = window.innerWidth / 2 - 50
          createElements(workflow.name, workflow.type, workflow.id, lastXPos.toString(), lastYPos.toString())

          lastLevel = workflow.level
        } else if (workflow.level === lastLevel) {
          lastYPos = lastYPos
          lastXPos = lastXPos + 200
          createElements(workflow.name, workflow.type, workflow.id, lastXPos.toString(), lastYPos.toString())

          lastLevel = workflow.level
        }
      }
      lastYPos = lastYPos + 200
      lastXPos = window.innerWidth / 2 - 50

      createElements('End', 'endBox', 0, lastXPos.toString(), lastYPos.toString())

      setLoading(true)
    }
  }, [createElements, createLines, workflows])

  return <div id="workflowDiagram" className="relative m-4"></div>
}

export default WorkflowDiagram
