import { useState } from 'react'
import { validateSettings, type FieldErrors } from './validation'

export interface SettingsFormProps {
  onSave?: (settings: {
    displayName: string
    email: string
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
  }) => void
}

function SettingsForm({ onSave }: SettingsFormProps) {
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [notifications, setNotifications] = useState(true)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<'idle' | 'saved'>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = validateSettings({ displayName, email, theme, notifications })
    if (!result.ok) {
      setErrors(result.errors)
      setStatus('idle')
      return
    }
    setErrors({})
    setDisplayName(result.data.displayName)
    setEmail(result.data.email)
    onSave?.(result.data)
    setStatus('saved')
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ marginBottom: 16 }}>
        <label htmlFor="displayName">Display name</label>
        <br />
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          aria-invalid={errors.displayName ? true : undefined}
          aria-describedby={errors.displayName ? 'displayName-error' : undefined}
        />
        {errors.displayName && (
          <p id="displayName-error" role="alert" style={{ color: '#b91c1c', margin: '4px 0 0' }}>
            {errors.displayName}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert" style={{ color: '#b91c1c', margin: '4px 0 0' }}>
            {errors.email}
          </p>
        )}
      </div>

      <div style={{ marginBottom: 16 }}>
        <label htmlFor="theme">Theme</label>
        <br />
        <select
          id="theme"
          name="theme"
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div style={{ marginBottom: 16 }}>
        <label>
          <input
            type="checkbox"
            name="notifications"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />{' '}
          Enable notifications
        </label>
      </div>

      <button type="submit">Save settings</button>

      <p role="status" aria-live="polite" style={{ color: '#15803d' }}>
        {status === 'saved' ? 'Settings saved.' : ''}
      </p>
    </form>
  )
}

export default SettingsForm
