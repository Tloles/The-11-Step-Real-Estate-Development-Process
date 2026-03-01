import { createContext, useContext, useReducer } from 'react'
import { projectReducer } from './projectReducer.js'
import { initialState } from './initialState.js'
import { recalcFinancials } from '../utils/calculations.js'

const ProjectContext = createContext(null)
const ProjectDispatchContext = createContext(null)

export function ProjectProvider({ children }) {
  const seededState = { ...initialState, financial: recalcFinancials(initialState.financial) }
  const [state, dispatch] = useReducer(projectReducer, seededState)

  return (
    <ProjectContext.Provider value={state}>
      <ProjectDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectDispatchContext.Provider>
    </ProjectContext.Provider>
  )
}

export function useProject() {
  const context = useContext(ProjectContext)
  if (!context) throw new Error('useProject must be used within ProjectProvider')
  return context
}

export function useDispatch() {
  const context = useContext(ProjectDispatchContext)
  if (!context) throw new Error('useDispatch must be used within ProjectProvider')
  return context
}
