import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { Button } from '@/components/ui/button'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="h-9 px-3 gap-1.5 font-mono text-xs font-bold"
      aria-label="Toggle theme mode"
    >
      {theme === 'dark' ? (
        <>
          <Sun className="h-3.5 w-3.5 text-amber-400" />
          <span>LIGHT</span>
        </>
      ) : (
        <>
          <Moon className="h-3.5 w-3.5 text-foreground" />
          <span>DARK</span>
        </>
      )}
    </Button>
  )
}
