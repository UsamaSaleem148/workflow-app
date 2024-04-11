'use client'
import React, { useEffect, useState } from 'react'
import AddWorkflowDialog from '../AddWorkflow/init'
import workflowApi from '../apis/workflowApi'
import { WorkFlow } from '../Models/WorkFlowModel'
import { useRouter } from 'next/navigation'

const WorkflowTable = () => {
  const router = useRouter()
  const [workflows, setWorkflows] = useState<WorkFlow[]>([])
  const [displayedWorkflows, setDisplayedWorkflows] = useState<WorkFlow[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [endIndex, setEndIndex] = useState<number>(0)
  const [startIndex, setStartIndex] = useState<number>(0)
  const [isAddingWorkflow, setIsAddingWorkflow] = useState<boolean>(false)
  const [editState, setEditState] = useState<{
    editingId: number
    editedName: string
  }>({
    editingId: 0,
    editedName: '',
  })

  const [currentPage, setCurrentPage] = useState<number>(1)

  const filteredWorkflows = (searchString: string) => {
    setSearchQuery(searchString)
    if (workflows && workflows !== null && workflows.length > 0) {
      const filter: WorkFlow[] = workflows.filter((workflow) => workflow.name.toLowerCase().includes(searchString.toLowerCase()))
      setDisplayedWorkflows(filter)
    }
  }

  const fetchWorkflow = async () => {
    const data = await workflowApi.fetchAllWorkFlows()
    setWorkflows(data)
  }

  useEffect(() => {
    if (!workflows || workflows === null || workflows.length === 0) {
      fetchWorkflow()
    }
  }, [workflows])

  useEffect(() => {
    if (workflows && workflows !== null && workflows.length > 0) {
      const startIdx = (currentPage - 1) * 5
      const endIdx = startIdx + 5
      setEndIndex(endIdx)
      setStartIndex(startIdx)
      setDisplayedWorkflows(workflows.slice(startIdx, endIdx))
    }
  }, [currentPage, workflows])

  const toggleAddWorkflowModal = (workFlow: WorkFlow | null) => {
    setIsAddingWorkflow(!isAddingWorkflow)
    if (workFlow !== null) {
      if (!workflows || workflows === null) {
        setWorkflows([workFlow])
      } else {
        setWorkflows([...workflows, workFlow])
      }
    }
  }

  const startEditing = (id: number, name: string) => {
    setEditState({
      editingId: id,
      editedName: name,
    })
  }

  const stopEditing = () => {
    setEditState({
      editingId: 0,
      editedName: '',
    })
  }

  const handleSaveClick = async (workflow: WorkFlow) => {
    workflow.name = editState.editedName
    await workflowApi.updateWorkflow(workflow)
    stopEditing()
  }

  const handleDeleteClick = async (workflowId: number) => {
    await workflowApi.deleteWorkflow(workflowId)
    await fetchWorkflow()
  }

  const goToWorkflow = (id: number) => {
    router.push(`/workflow/${id}`)
  }

  return (
    <div className="m-4 border border-gray-200 p-2 rounded-lg">
      {isAddingWorkflow ? <AddWorkflowDialog toggleAddWorkflowModal={toggleAddWorkflowModal} /> : null}

      <div className="mb-4 flex justify-between">
        <input type="text" placeholder="Search workflows..." className="border border-gray-300 px-2 py-1 rounded" value={searchQuery} onChange={(e) => filteredWorkflows(e.target.value)} />
        <button
          className="px-3 py-1 rounded button"
          onClick={() => {
            toggleAddWorkflowModal(null)
          }}
        >
          Add Workflow
        </button>
      </div>
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-100 p-4">
            <th className="p-4 text-gray-700">Workflows</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {displayedWorkflows &&
            displayedWorkflows !== null &&
            displayedWorkflows.length > 0 &&
            displayedWorkflows.map((workflow) => (
              <tr key={workflow.id} id={`${workflow.id}`} className="border-b border-gray-200">
                {editState.editingId === workflow.id ? (
                  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                    <input
                      type="text"
                      className="border border-gray-300 px-2 py-1 rounded w-full mb-4"
                      value={editState.editedName}
                      onChange={(e) =>
                        setEditState({
                          ...editState,
                          editedName: e.target.value,
                        })
                      }
                    />
                  </td>
                ) : (
                  <td
                    onClick={() => {
                      goToWorkflow(workflow.id)
                    }}
                    className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900 cursor-pointer"
                  >
                    {workflow.name}
                  </td>
                )}
                <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  {editState.editingId === workflow.id ? (
                    <>
                      <button onClick={() => handleSaveClick(workflow)} className="text-green-600 hover:text-green-900">
                        Save
                      </button>
                      <span className="mx-2 text-gray-300">|</span>
                      <button onClick={stopEditing} className="text-gray-600 hover:text-gray-900">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEditing(workflow.id, workflow.name)} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </button>
                      <span className="mx-2 text-gray-300">|</span>
                      <button onClick={() => handleDeleteClick(workflow.id)} className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {displayedWorkflows && displayedWorkflows !== null && displayedWorkflows.length > 0 && (
        <div className="mt-4">
          {/* Pagination controls */}
          <div className="flex justify-end">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded mr-2 button">
              Previous
            </button>
            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={endIndex >= displayedWorkflows.length} className="px-3 py-1 rounded button">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorkflowTable
