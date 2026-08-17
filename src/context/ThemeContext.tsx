import React, { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
export type Preset = 'retro' | 'default' | 'glass' | 'glow'

interface ThemeContextType {
  theme: Theme
  preset: Preset
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  setPreset: (preset: Preset) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('vibe-theme') as Theme
    return saved || 'light' // Warm vintage cream light mode by default
  })

  const [preset, setPresetState] = useState<Preset>(() => {
    const saved = localStorage.getItem('vibe-preset') as Preset
    return saved || 'retro' // Retro theme by default
  })

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
    root.setAttribute('data-preset', preset)
    localStorage.setItem('vibe-theme', theme)
    localStorage.setItem('vibe-preset', preset)
  }, [theme, preset])

  const setTheme = (t: Theme) => setThemeState(t)
  const toggleTheme = () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  const setPreset = (p: Preset) => setPresetState(p)

  return (
    <ThemeContext.Provider value={{ theme, preset, setTheme, toggleTheme, setPreset }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
