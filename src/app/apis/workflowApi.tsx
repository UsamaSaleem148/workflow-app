import axios from 'axios'
import { WorkFlow } from '../Models/WorkFlowModel'
import { showErrorMessage, showSuccessMessage } from '../utilities/Alert'

const API_BASE_URL = '/api'

const fetchAllWorkFlows = async () => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/getAll`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error
  }
}

const fetchAllWorkFlowsById = async (id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/${id}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error
  }
}

const getConditionsByInitId = async (id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/condition/${id}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error
  }
}

const getActionsByInitId = async (id: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/action/${id}`
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    throw error
  }
}

const createWorkflow = async (workflowData: WorkFlow) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/create`
    const response = await axios.post(url, workflowData)
    showSuccessMessage('Workflow created successfully')
    return response.data
  } catch (error) {
    showErrorMessage('An error occurred while creating the workflow. Please try again later.')
  }
}

const createWorkflows = async (workflowData: WorkFlow[]) => {
  try {
    for (let i = 0; i < workflowData.length; i++) {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/create`
      await axios.post(url, workflowData[i])
    }
    showSuccessMessage('Workflow created successfully')
  } catch (error) {
    showErrorMessage('An error occurred while creating the workflow. Please try again later.')
  }
}

const updateWorkflow = async (workflowData: WorkFlow) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/update`
    const response = await axios.put(url, workflowData)
    showSuccessMessage('Workflow updated successfully')
    return response.data
  } catch (error) {
    showErrorMessage('An error occurred while updating the workflow. Please try again later.')
  }
}

const deleteWorkflow = async (workflowId: number) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_BASE_URL}/workflow/delete`
    const response = await axios.delete(url, { data: { workflowId: workflowId } })
    showSuccessMessage('Workflow deleted successfully')
    return response.data
  } catch (error) {
    showErrorMessage('An error occurred while deleting the workflow. Please try again later.')
  }
}

const workflowApi = {
  fetchAllWorkFlowsById,
  createWorkflow,
  fetchAllWorkFlows,
  updateWorkflow,
  deleteWorkflow,
  getConditionsByInitId,
  getActionsByInitId,
  createWorkflows,
}

export default workflowApi
