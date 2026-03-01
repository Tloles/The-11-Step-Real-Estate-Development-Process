import { useProject, useDispatch } from '../../state/ProjectContext.jsx'
import {
  Lightbulb, Search, BarChart3, FileText, Wallet,
  GanttChart, Hammer, CheckCircle2, Building, Target, LogOut
} from 'lucide-react'

const steps = [
  { num: 1, name: 'Inception', icon: Lightbulb, layer: 'research' },
  { num: 2, name: 'Refinement', icon: Search, layer: 'research' },
  { num: 3, name: 'Feasibility', icon: BarChart3, layer: 'research' },
  { num: 4, name: 'Contracts', icon: FileText, layer: 'scenario' },
  { num: 5, name: 'Financing', icon: Wallet, layer: 'research' },
  { num: 6, name: 'Closing', icon: GanttChart, layer: 'scenario' },
  { num: 7, name: 'Construction', icon: Hammer, layer: 'scenario' },
  { num: 8, name: 'Completion', icon: CheckCircle2, layer: 'scenario' },
  { num: 9, name: 'Management', icon: Building, layer: 'scenario' },
  { num: 10, name: 'Stabilization', icon: Target, layer: 'scenario' },
  { num: 11, name: 'Exit', icon: LogOut, layer: 'research' },
]

const layerColors = {
  research: 'blue',
  scenario: 'gold',
}

export default function StepNavigator() {
  const { currentStep } = useProject()
  const dispatch = useDispatch()

  return (
    <nav className="border-b border-border-default bg-bg-surface/50">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex gap-0.5 overflow-x-auto py-2 scrollbar-hide">
          {steps.map((step) => {
            const Icon = step.icon
            const isActive = currentStep === step.num
            const color = layerColors[step.layer]
            const isResearch = step.layer === 'research'

            return (
              <button
                key={step.num}
                onClick={() => dispatch({ type: 'SET_STEP', payload: step.num })}
                className={`
                  flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap transition-all
                  ${isActive
                    ? isResearch
                      ? 'bg-blue/10 text-blue'
                      : 'bg-gold/10 text-gold'
                    : 'text-text-muted hover:text-text-secondary hover:bg-bg-card'
                  }
                `}
              >
                <span className={`
                  w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0
                  ${isActive
                    ? isResearch
                      ? 'bg-blue text-white'
                      : 'bg-gold text-bg-primary'
                    : 'bg-bg-card text-text-muted'
                  }
                `}>
                  {step.num}
                </span>
                <Icon className="w-3.5 h-3.5 shrink-0 hidden sm:block" />
                <span className="hidden md:inline">{step.name}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
