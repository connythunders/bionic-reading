import { cn } from '@/lib/utils'

type Props = {
  code: string
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const sizes = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
}

/** Derive a lighter tint from the base color for the gradient stop. */
function lightenHex(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lr = Math.round(r + (255 - r) * 0.55)
  const lg = Math.round(g + (255 - g) * 0.55)
  const lb = Math.round(b + (255 - b) * 0.55)
  return `rgb(${lr},${lg},${lb})`
}

export function GroupIcon({ code, size = 'md', color = '#166534', className }: Props) {
  const lightColor = lightenHex(color)

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-xl font-bold text-white flex-shrink-0',
        'shadow-sm',
        sizes[size],
        className
      )}
      style={{
        background: `linear-gradient(135deg, ${color} 0%, ${lightColor} 100%)`,
      }}
      aria-hidden="true"
    >
      {code.slice(0, 3)}
    </span>
  )
}
