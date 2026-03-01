import { Building2, Download } from 'lucide-react'

export default function Header() {
  return (
    <header className="border-b border-border-default bg-bg-surface sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-text-primary leading-tight">
              11-Step Development Process
            </h1>
            <p className="text-xs text-text-muted leading-tight">
              CRE Feasibility Workbench
            </p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-card transition-colors">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>
    </header>
  )
}
