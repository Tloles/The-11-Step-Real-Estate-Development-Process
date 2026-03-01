import { useProject, useDispatch } from '../../state/ProjectContext.jsx'
import MacroDashboard from '../research/MacroDashboard.jsx'
import SectorResearch from '../research/SectorResearch.jsx'
import DriversOfChange from '../research/DriversOfChange.jsx'
import SpreadCalculator from '../financial/SpreadCalculator.jsx'
import AIAnalysisPanel from '../shared/AIAnalysisPanel.jsx'
import { Lightbulb, MapPin } from 'lucide-react'

export default function Step1Inception() {
  const { project } = useProject()
  const dispatch = useDispatch()

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
          <Lightbulb className="w-5 h-5 text-blue" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-blue font-semibold">Step 1</span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted">Research</span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">Inception of an Idea</h2>
          <p className="text-sm text-text-secondary mt-1">
            Define your project concept, assess the macro environment, select a sector, and identify key drivers of change.
          </p>
        </div>
      </div>

      {/* Project definition */}
      <div className="bg-bg-card rounded-xl border border-border-subtle p-5">
        <h3 className="text-sm font-semibold text-text-primary mb-4">Project Concept</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1.5">
              Project Name
            </label>
            <input
              type="text"
              value={project.name}
              onChange={(e) => dispatch({ type: 'UPDATE_PROJECT', payload: { name: e.target.value } })}
              placeholder="e.g., Brookhaven Mixed-Use"
              className="w-full bg-bg-surface border border-border-default rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1.5">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Location</span>
            </label>
            <input
              type="text"
              value={project.location}
              onChange={(e) => dispatch({ type: 'UPDATE_PROJECT', payload: { location: e.target.value } })}
              placeholder="e.g., Brookhaven, GA"
              className="w-full bg-bg-surface border border-border-default rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-colors"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] uppercase tracking-wider text-text-muted font-medium mb-1.5">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) => dispatch({ type: 'UPDATE_PROJECT', payload: { description: e.target.value } })}
              placeholder="Brief description of the project concept, scale, and vision..."
              rows={2}
              className="w-full bg-bg-surface border border-border-default rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-gold/50 focus:border-gold/50 transition-colors resize-none"
            />
          </div>
        </div>
      </div>

      {/* Two-column layout for main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MacroDashboard />
          <DriversOfChange />
        </div>
        <div className="space-y-6">
          <SectorResearch />
          <SpreadCalculator />
        </div>
      </div>

      {/* AI Analysis (full width) */}
      <AIAnalysisPanel />
    </div>
  )
}
