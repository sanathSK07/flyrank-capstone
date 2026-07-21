import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SettingsForm from './SettingsForm'
import { validateSettings } from './validation'

describe('validateSettings', () => {
  it('accepts valid input and trims whitespace', () => {
    const result = validateSettings({
      displayName: '  Sanath  ',
      email: ' sanath@example.com ',
      theme: 'dark',
      notifications: true,
    })
    expect(result.ok).toBe(true)
    if (result.ok) {
      expect(result.data.displayName).toBe('Sanath')
      expect(result.data.email).toBe('sanath@example.com')
    }
  })

  it('rejects a 1-character display name', () => {
    const result = validateSettings({
      displayName: 'S',
      email: 'sanath@example.com',
      theme: 'light',
      notifications: false,
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.displayName).toMatch(/at least 2/)
    }
  })

  it('rejects an email without a TLD-like structure', () => {
    const result = validateSettings({
      displayName: 'Sanath',
      email: 'sanath@invalid',
      theme: 'light',
      notifications: false,
    })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.errors.email).toBeTruthy()
    }
  })

  it('rejects a whitespace-only display name', () => {
    const result = validateSettings({
      displayName: '   ',
      email: 'sanath@example.com',
      theme: 'system',
      notifications: true,
    })
    expect(result.ok).toBe(false)
  })
})

describe('SettingsForm', () => {
  it('renders labeled controls', () => {
    render(<SettingsForm />)
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/theme/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/enable notifications/i)).toBeInTheDocument()
  })

  it('shows accessible errors and does not call onSave for invalid input', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    render(<SettingsForm onSave={onSave} />)

    await user.type(screen.getByLabelText(/display name/i), 'S')
    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    const alerts = await screen.findAllByRole('alert')
    expect(alerts.length).toBeGreaterThanOrEqual(2)
    expect(onSave).not.toHaveBeenCalled()

    const emailInput = screen.getByLabelText(/email/i)
    expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-error')
  })

  it('calls onSave with trimmed values and keeps values in the form', async () => {
    const user = userEvent.setup()
    const onSave = vi.fn()
    render(<SettingsForm onSave={onSave} />)

    await user.type(screen.getByLabelText(/display name/i), '  Sanath ')
    await user.type(screen.getByLabelText(/email/i), 'sanath@example.com')
    await user.selectOptions(screen.getByLabelText(/theme/i), 'dark')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(onSave).toHaveBeenCalledWith({
      displayName: 'Sanath',
      email: 'sanath@example.com',
      theme: 'dark',
      notifications: true,
    })
    expect(await screen.findByText(/settings saved/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/display name/i)).toHaveValue('Sanath')
    expect(screen.getByLabelText(/email/i)).toHaveValue('sanath@example.com')
  })

  it('clears the error once the user fixes the field and resubmits', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.click(screen.getByRole('button', { name: /save settings/i }))
    expect((await screen.findAllByRole('alert')).length).toBeGreaterThan(0)

    await user.type(screen.getByLabelText(/display name/i), 'Sanath')
    await user.type(screen.getByLabelText(/email/i), 'sanath@example.com')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
