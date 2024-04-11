'use strict'
import React, { useState } from 'react'
import workflowApi from '../apis/workflowApi'
import { WorkFlow } from '../Models/WorkFlowModel'

interface AnotherComponentProps {
  toggleAddWorkflowModal: (id: WorkFlow | null) => void
}

const AddWorkflowDialog = ({ toggleAddWorkflowModal }: AnotherComponentProps) => {
  const [newWorkflowName, setNewWorkflowName] = useState<string>('')

  const handleAddWorkflow = async () => {
    const workflowData: WorkFlow = {
      id: 0,
      name: newWorkflowName,
      type: 'init',
      parent_id: null,
      child_id: null,
      level: 0,
      initWorkflowId: 0
    }
    workflowApi
      .createWorkflow(workflowData)
      .then((res) => {
        workflowData.id = res.id
        toggleAddWorkflowModal(workflowData)
        setNewWorkflowName('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Workflow</h2>
        <input type="text" placeholder="Workflow Name" className="border border-gray-300 px-2 py-1 rounded w-full mb-4" value={newWorkflowName} onChange={(e) => setNewWorkflowName(e.target.value)} />
        <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={handleAddWorkflow}>
          Add
        </button>
        <button
          className="bg-gray-300 text-gray-700 px-3 py-1 rounded ml-2"
          onClick={() => {
            toggleAddWorkflowModal(null)
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AddWorkflowDialog
