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

export function GroupIcon({ code, size = 'md', color = '#166534', className }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-md font-bold text-white flex-shrink-0',
        sizes[size],
        className
      )}
      style={{ backgroundColor: color }}
      aria-hidden="true"
    >
      {code.slice(0, 3)}
    </span>
  )
}
