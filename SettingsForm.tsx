import { useState } from 'react'

function SettingsForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [theme, setTheme] = useState('light')
  const [notifications, setNotifications] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}
    if (!name) {
      newErrors.name = 'Name is required'
    }
    if (!email || !/\S+@\S+/.test(email)) {
      newErrors.email = 'Invalid email'
    }
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log({ name, email, theme, notifications })
      setSaved(true)
      setName('')
      setEmail('')
      setTheme('light')
      setNotifications(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: 16 }}>
        <div>Display Name</div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <div>Email</div>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
      </div>
      <div style={{ marginBottom: 16 }}>
        <div>Theme</div>
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div style={{ marginBottom: 16 }}>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
          Enable notifications
        </label>
      </div>
      <button type="submit">Save</button>
      {saved && <div style={{ color: 'green' }}>Settings saved!</div>}
    </form>
  )
}

export default SettingsForm
