import { z } from 'zod'

export const settingsSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, 'Display name must be at least 2 characters')
    .max(50, 'Display name must be 50 characters or fewer'),
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Enter a valid email address'),
  theme: z.enum(['light', 'dark', 'system']),
  notifications: z.boolean(),
})

export type Settings = z.infer<typeof settingsSchema>

export type FieldErrors = Partial<Record<keyof Settings, string>>

export function validateSettings(input: unknown):
  | { ok: true; data: Settings }
  | { ok: false; errors: FieldErrors } {
  const result = settingsSchema.safeParse(input)
  if (result.success) {
    return { ok: true, data: result.data }
  }
  const errors: FieldErrors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof Settings
    if (key && !errors[key]) {
      errors[key] = issue.message
    }
  }
  return { ok: false, errors }
}
