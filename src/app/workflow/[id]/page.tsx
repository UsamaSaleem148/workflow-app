'use client'
import AddActionDialog from '@/app/AddWorkflow/action'
import AddConditionDialog from '@/app/AddWorkflow/condition'
import { WorkFlow } from '@/app/Models/WorkFlowModel'
import workflowApi from '@/app/apis/workflowApi'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface PageProps {
  params: {
    id: string
  }
}

function Workflow({ params }: PageProps) {
  const [isAddingCondition, setIsAddingCondition] = useState<boolean>(false)
  const [isAddingAction, setIsAddingAction] = useState<boolean>(false)
  const [activeTab, setActiveTab] = useState<string>('conditions')
  const [filteredConditions, setFilteredConditions] = useState<WorkFlow[]>([])
  const [filteredActions, setFilteredActions] = useState<WorkFlow[]>([])
  const [conditions, setConditions] = useState<WorkFlow[]>([])
  const [actions, setActions] = useState<WorkFlow[]>([])
  const [editState, setEditState] = useState<{
    editingId: number
    editedName: string
  }>({
    editingId: 0,
    editedName: '',
  })

  const [searchQuery, setSearchQuery] = useState<string>('')

  const switchTab = (tab: string) => {
    setActiveTab(tab)
    setFilteredConditions(conditions)
    setFilteredActions(actions)
    setSearchQuery('')
  }

  const filteredWorkflows = (searchString: string) => {
    setSearchQuery(searchString)
    if (activeTab === 'conditions' && conditions && conditions !== null && conditions.length > 0) {
      const filter: WorkFlow[] = conditions.filter((condition) => condition.name.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredConditions(filter)
    } else if (activeTab === 'actions' && actions && actions !== null && actions.length > 0) {
      const filter: WorkFlow[] = actions.filter((action) => action.name.toLowerCase().includes(searchString.toLowerCase()))
      setFilteredActions(filter)
    }
  }

  useEffect(() => {
    const fetchWorkflow = async () => {
      const data = await workflowApi.getConditionsByInitId(parseInt(params.id))
      setConditions(data.workflow)
      setFilteredConditions(data.workflow)
    }

    if (conditions === null || !conditions.length) {
      fetchWorkflow()
    }
  }, [conditions, params.id])

  useEffect(() => {
    const fetchWorkflow = async () => {
      const data = await workflowApi.getActionsByInitId(parseInt(params.id))
      setActions(data.workflow)
      setFilteredActions(data.workflow)
    }

    if (actions === null || !actions.length) {
      fetchWorkflow()
    }
  }, [actions, params.id])

  const toggleAddConditionModal = () => {
    setIsAddingCondition(!isAddingCondition)
    setConditions([])
  }

  const toggleAddActionModal = () => {
    setIsAddingAction(!isAddingAction)
    setActions([])
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

  const handleConditionSave = async (workflow: WorkFlow) => {
    workflow.name = editState.editedName
    await workflowApi.updateWorkflow(workflow)
    stopEditing()
  }

  const handleConditionDelete = async (workflowId: number) => {
    await workflowApi.deleteWorkflow(workflowId)
    setConditions([])
  }

  const handleActionSave = async (workflow: WorkFlow) => {
    workflow.name = editState.editedName
    await workflowApi.updateWorkflow(workflow)
    stopEditing()
  }

  const handleActionDelete = async (workflowId: number) => {
    await workflowApi.deleteWorkflow(workflowId)
    setActions([])
  }

  return (
    <div className="container mx-auto p-4">
      {isAddingCondition && params.id ? <AddConditionDialog toggleAddConditionModal={toggleAddConditionModal} id={params.id} /> : null}
      {isAddingAction && params.id ? <AddActionDialog toggleAddActionModal={toggleAddActionModal} id={params.id} /> : null}
      <h1 className="text-2xl font-semibold mb-4">Workflow Page</h1>
      <div className="mb-4 flex justify-between">
        <div>
          <button className={`mr-4 p-2 ${activeTab === 'conditions' ? 'px-3 py-1 rounded button text-white' : 'px-3 py-1 rounded bg-gray-300 text-gray-700'}`} onClick={() => switchTab('conditions')}>
            Conditions
          </button>
          <button className={`p-2 ${activeTab === 'actions' ? 'px-3 py-1 rounded button text-white' : 'px-3 py-1 rounded bg-gray-300 text-gray-700'}`} onClick={() => switchTab('actions')}>
            Actions
          </button>
        </div>
        <Link href={'workflowdiagram/' + params.id} className={`secondary-background-color px-3 py-1 rounded text-white`}>
          Visualize Workflow
        </Link>
      </div>
      <div className="border border-gray-200 p-2">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder={`Search ${activeTab === 'conditions' ? 'conditions...' : 'actions...'}`}
            className="border border-gray-300 px-2 rounded"
            value={searchQuery}
            onChange={(e) => filteredWorkflows(e.target.value)}
          />
          <button className="px-3 py-1 rounded button text-white" onClick={activeTab === 'conditions' ? toggleAddConditionModal : toggleAddActionModal}>
            Add {activeTab === 'conditions' ? 'Condition' : 'Action'}
          </button>
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-100 p-4">
              <th className="p-4 text-gray-700">Name</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {activeTab === 'conditions'
              ? filteredConditions &&
                filteredConditions.length > 0 &&
                filteredConditions.map((condition) => (
                  <tr key={condition.id} className="border-b border-gray-200">
                    {editState.editingId === condition.id ? (
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
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{condition.name}</td>
                    )}

                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                      {editState.editingId === condition.id ? (
                        <>
                          <button onClick={() => handleConditionSave(condition)} className="text-green-600 hover:text-green-900">
                            Save
                          </button>
                          <span className="mx-2 text-gray-300">|</span>
                          <button onClick={stopEditing} className="text-gray-600 hover:text-gray-900">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditing(condition.id, condition.name)} className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                          <span className="mx-2 text-gray-300">|</span>
                          <button onClick={() => handleConditionDelete(condition.id)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              : filteredActions &&
                filteredActions.length > 0 &&
                filteredActions.map((action) => (
                  <tr key={action.id} className="border-b border-gray-200">
                    {editState.editingId === action.id ? (
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
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">{action.name}</td>
                    )}

                    <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                      {editState.editingId === action.id ? (
                        <>
                          <button onClick={() => handleActionSave(action)} className="text-green-600 hover:text-green-900">
                            Save
                          </button>
                          <span className="mx-2 text-gray-300">|</span>
                          <button onClick={stopEditing} className="text-gray-600 hover:text-gray-900">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEditing(action.id, action.name)} className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </button>
                          <span className="mx-2 text-gray-300">|</span>
                          <button onClick={() => handleActionDelete(action.id)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Workflow
