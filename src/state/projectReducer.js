import { recalcFinancials } from '../utils/calculations.js'

export function projectReducer(state, action) {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }

    case 'UPDATE_PROJECT':
      return { ...state, project: { ...state.project, ...action.payload } }

    case 'SET_MACRO_LOADING':
      return { ...state, macro: { ...state.macro, loading: true, error: null } }

    case 'SET_MACRO_DATA':
      return {
        ...state,
        macro: {
          ...state.macro,
          indicators: { ...state.macro.indicators, ...action.payload },
          lastFetched: new Date().toISOString(),
          loading: false,
        },
      }

    case 'SET_MACRO_ERROR':
      return { ...state, macro: { ...state.macro, loading: false, error: action.payload } }

    case 'SET_SECTOR': {
      return {
        ...state,
        sector: { ...state.sector, selected: action.payload.sector, subtype: action.payload.subtype },
        project: { ...state.project, sector: action.payload.sector, subtype: action.payload.subtype },
      }
    }

    case 'SET_SECTOR_TRENDS':
      return { ...state, sector: { ...state.sector, trends: action.payload, loading: false } }

    case 'SET_SECTOR_LOADING':
      return { ...state, sector: { ...state.sector, loading: action.payload } }

    case 'TOGGLE_DRIVER': {
      const drivers = state.drivers.selected.includes(action.payload)
        ? state.drivers.selected.filter(d => d !== action.payload)
        : [...state.drivers.selected, action.payload]
      return { ...state, drivers: { ...state.drivers, selected: drivers } }
    }

    case 'SET_DRIVER_RESEARCH':
      return {
        ...state,
        drivers: {
          ...state.drivers,
          research: { ...state.drivers.research, [action.payload.driver]: action.payload.data },
        },
      }

    case 'UPDATE_FINANCIAL': {
      const updatedFinancial = { ...state.financial, ...action.payload }
      return { ...state, financial: recalcFinancials(updatedFinancial) }
    }

    case 'SET_AI_LOADING':
      return { ...state, aiAnalysis: { ...state.aiAnalysis, loading: true, error: null } }

    case 'ADD_AI_RESULT':
      return {
        ...state,
        aiAnalysis: {
          ...state.aiAnalysis,
          results: [action.payload, ...state.aiAnalysis.results],
          loading: false,
        },
      }

    case 'SET_AI_ERROR':
      return { ...state, aiAnalysis: { ...state.aiAnalysis, loading: false, error: action.payload } }

    case 'SET_RESEARCH':
      return {
        ...state,
        research: { ...state.research, [action.payload.step]: action.payload.data },
      }

    default:
      return state
  }
}
