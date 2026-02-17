import { useState, useEffect, useCallback } from 'react'

export interface UserProfile {
  name: string
  settings: AppSettings
}

export interface AppSettings {
  // Typography
  fontFamily: 'OpenDyslexic' | 'Arial' | 'Verdana'
  fontSize: number        // 14-32
  letterSpacing: number   // 0-8
  wordSpacing: number     // 0-16
  lineHeight: number      // 1.2-3.0

  // Colors
  backgroundColor: string
  textColor: string
  highContrast: boolean

  // Reading ruler
  rulerEnabled: boolean
  rulerColor: string
  rulerHeight: number     // 1-3 (line count)

  // Focus mode
  focusModeEnabled: boolean

  // Syllable helper
  syllableMode: boolean

  // TTS
  ttsRate: number         // 0.5-2
  ttsLang: string

  // General
  language: string
}

const DEFAULT_SETTINGS: AppSettings = {
  fontFamily: 'Arial',
  fontSize: 20,
  letterSpacing: 1,
  wordSpacing: 2,
  lineHeight: 1.8,

  backgroundColor: '#FFFFFF',
  textColor: '#1A1A1A',
  highContrast: false,

  rulerEnabled: false,
  rulerColor: '#FFE066',
  rulerHeight: 2,

  focusModeEnabled: false,
  syllableMode: false,

  ttsRate: 1.0,
  ttsLang: 'sv-SE',

  language: 'sv',
}

const STORAGE_KEY = 'lashjälpen-settings'
const PROFILES_KEY = 'lashjälpen-profiles'

function loadSettings(): AppSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
    }
  } catch {
    // Ignore parse errors
  }
  return { ...DEFAULT_SETTINGS }
}

function loadProfiles(): UserProfile[] {
  try {
    const stored = localStorage.getItem(PROFILES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {
    // Ignore
  }
  return []
}

export function useSettings() {
  const [settings, setSettingsState] = useState<AppSettings>(loadSettings)
  const [profiles, setProfilesState] = useState<UserProfile[]>(loadProfiles)

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // localStorage full or unavailable
    }
  }, [settings])

  // Save profiles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles))
    } catch {
      // Ignore
    }
  }, [profiles])

  const updateSetting = useCallback(<K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K]
  ) => {
    setSettingsState(prev => ({ ...prev, [key]: value }))
  }, [])

  const updateSettings = useCallback((partial: Partial<AppSettings>) => {
    setSettingsState(prev => ({ ...prev, ...partial }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettingsState({ ...DEFAULT_SETTINGS })
  }, [])

  const saveProfile = useCallback((name: string) => {
    setProfilesState(prev => {
      const existing = prev.findIndex(p => p.name === name)
      const profile: UserProfile = { name, settings: { ...settings } }
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = profile
        return updated
      }
      return [...prev, profile]
    })
  }, [settings])

  const loadProfile = useCallback((name: string) => {
    const profile = profiles.find(p => p.name === name)
    if (profile) {
      setSettingsState({ ...DEFAULT_SETTINGS, ...profile.settings })
    }
  }, [profiles])

  const deleteProfile = useCallback((name: string) => {
    setProfilesState(prev => prev.filter(p => p.name !== name))
  }, [])

  // Apply high contrast override
  const effectiveSettings = { ...settings }
  if (settings.highContrast) {
    effectiveSettings.backgroundColor = '#000000'
    effectiveSettings.textColor = '#FFFFFF'
  }

  return {
    settings: effectiveSettings,
    rawSettings: settings,
    updateSetting,
    updateSettings,
    resetSettings,
    profiles,
    saveProfile,
    loadProfile,
    deleteProfile,
    DEFAULT_SETTINGS,
  }
}
