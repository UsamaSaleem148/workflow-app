'use strict'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import workflowApi from '../apis/workflowApi'
import { WorkFlow } from '../Models/WorkFlowModel'
import { showErrorMessage } from '../utilities/Alert'

interface AnotherComponentProps {
  toggleAddConditionModal: (id: WorkFlow | null) => void
  id: string
}

const AddConditionDialog = ({ toggleAddConditionModal, id }: AnotherComponentProps) => {
  const [ifCondition, setIfCondition] = useState<string>('')
  const [elseCondition, setElseCondition] = useState<string>('')
  const [workflows, setWorkflows] = useState<WorkFlow[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<number>(0)

  const fetchWorkflow = useCallback(async () => {
    const data = await workflowApi.fetchAllWorkFlowsById(parseInt(id))
    setWorkflows(data.workflow)
  }, [id])

  useEffect(() => {
    if (workflows === null || workflows.length === 0) {
      fetchWorkflow()
    }
  }, [fetchWorkflow, workflows])

  const handleAddCondition = async () => {
    if (!ifCondition || ifCondition === '' || !elseCondition || elseCondition === '') {
      showErrorMessage('Please enter a valid data')
      return
    }

    if (selectedId === null || selectedId === undefined) {
      showErrorMessage('Please select atleast one workflow')
      return
    }

    if (id === null || id === '' || id === undefined) {
      showErrorMessage('Init box id not found')
      return
    }
    const ifWorkflowData: WorkFlow = {
      id: 0,
      name: ifCondition,
      type: 'condition',
      parent_id: selectedId,
      child_id: null,
      level: selectedLevel + 1,
      initWorkflowId: parseInt(id),
    }
    const elseWorkflowData: WorkFlow = {
      id: 0,
      name: elseCondition,
      type: 'condition',
      parent_id: selectedId,
      child_id: null,
      level: selectedLevel + 1,
      initWorkflowId: parseInt(id),
    }

    workflowApi
      .createWorkflows([ifWorkflowData, elseWorkflowData])
      .then(() => {
        toggleAddConditionModal(null)
        setIfCondition('')
        setElseCondition('')
        setSelectedId(null)
        setSelectedLevel(0)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const onWorkflowSelected = (event: ChangeEvent<HTMLSelectElement>) => {
    const workFlow = workflows[parseInt(event.target.value)]
    setSelectedId(workFlow.id)
    setSelectedLevel(workFlow.level)
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="relative mb-4">
          <label htmlFor="workflow-select">Select Workflow</label>
          <select
            onChange={(event) => {
              onWorkflowSelected(event)
            }}
            name="workflow-select"
            className="block appearance-none w-full bg-white border border-gray-300 
                     hover:border-gray-500 px-4 py-2 pr-8 rounded-md 
                     shadow leading-tight focus:outline-none focus:shadow-outline-blue 
                     focus:border-blue-300"
          >
            <option selected disabled>
              Select Workflow
            </option>
            {workflows &&
              workflows.length > 0 &&
              workflows.map((res, idx) => (
                <option value={idx} key={idx}>
                  {res.name}
                </option>
              ))}
          </select>
        </div>

        <label htmlFor="workflow-if-condition">If Condition</label>
        <input
          type="text"
          name="workflow-if-condition"
          placeholder="If Condition"
          className="border border-gray-300 px-2 py-1 rounded w-full mb-4"
          value={ifCondition}
          onChange={(e) => setIfCondition(e.target.value)}
        />

        <label htmlFor="workflow-else-condition">Select Workflow</label>
        <input
          type="text"
          name="workflow-else-condition"
          placeholder="Else Condition"
          className="border border-gray-300 px-2 py-1 rounded w-full mb-4"
          value={elseCondition}
          onChange={(e) => setElseCondition(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleAddCondition}>
          Add
        </button>

        <button
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded ml-2"
          onClick={() => {
            toggleAddConditionModal(null)
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddConditionDialog
