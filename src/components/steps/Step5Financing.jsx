import { Wallet } from 'lucide-react'

export default function Step5Financing() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center shrink-0">
          <Wallet className="w-5 h-5 text-blue" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-blue font-semibold">Step 5</span>
            <span className="text-[10px] uppercase tracking-widest text-text-muted">Research</span>
          </div>
          <h2 className="text-xl font-bold text-text-primary">Financing</h2>
          <p className="text-sm text-text-secondary mt-1">Capital markets intelligence, debt terms, equity expectations, public incentives.</p>
        </div>
      </div>
      <div className="bg-bg-card rounded-xl border border-border-subtle p-8 text-center">
        <Wallet className="w-8 h-8 text-text-muted mx-auto mb-3" />
        <p className="text-sm text-text-secondary">Coming in Phase 2</p>
      </div>
    </div>
  )
}
