import { Target } from 'lucide-react'

export default function Step10Stabilization() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
          <Target className="w-5 h-5 text-gold" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Step 10</span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted">Scenario</span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">Stabilization</h2>
          <p className="text-sm text-text-secondary mt-1">Stabilization threshold, time-to-stabilization, and refinancing scenarios.</p>
        </div>
      </div>
      <div className="bg-bg-card rounded-xl border border-border-subtle p-8 text-center">
        <Target className="w-8 h-8 text-text-muted mx-auto mb-3" />
        <p className="text-sm text-text-secondary">Coming in Phase 3</p>
      </div>
    </div>
  )
}
