const colorMap = {
  healthy: 'bg-healthy',
  caution: 'bg-caution',
  warning: 'bg-warning',
}

const textMap = {
  healthy: 'text-healthy',
  caution: 'text-caution',
  warning: 'text-warning',
}

export default function TrafficLight({ status, label, size = 'sm' }) {
  const dotSize = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'

  return (
    <div className="flex items-center gap-1.5">
      <span className={`${dotSize} rounded-full ${colorMap[status]}`} />
      {label && (
        <span className={`text-xs font-medium ${textMap[status]}`}>{label}</span>
      )}
    </div>
  )
}
