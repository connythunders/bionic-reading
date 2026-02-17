import { useState, useEffect, useCallback } from 'react'

interface ReadingRulerProps {
  enabled: boolean
  color: string
  height: number // 1-3 lines
  fontSize: number
  lineHeight: number
}

export default function ReadingRuler({
  enabled,
  color,
  height,
  fontSize,
  lineHeight,
}: ReadingRulerProps) {
  const [mouseY, setMouseY] = useState(-100)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseY(e.clientY)
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      setMouseY(e.touches[0].clientY)
    }
  }, [])

  useEffect(() => {
    if (!enabled) return

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [enabled, handleMouseMove, handleTouchMove])

  if (!enabled || mouseY < 0) return null

  const rulerPixelHeight = fontSize * lineHeight * height

  return (
    <div
      className="reading-ruler"
      style={{
        top: `${mouseY - rulerPixelHeight / 2}px`,
        height: `${rulerPixelHeight}px`,
        backgroundColor: color,
        opacity: 0.25,
      }}
      aria-hidden="true"
    />
  )
}
