import { useState } from 'react'
import { authClient } from '#/lib/auth-client'

export function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [mode, setMode] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError(null)
    setPending(true)

    const result =
      mode === 'sign-in'
        ? await authClient.signIn.email({ email, password })
        : await authClient.signUp.email({ email, password, name })

    setPending(false)

    if (result.error) {
      setError(result.error.message ?? 'Something went wrong')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-sm">
      {mode === 'sign-up' && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-neutral-300 px-3 py-2 rounded-md"
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-neutral-300 px-3 py-2 rounded-md"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-neutral-300 px-3 py-2 rounded-md"
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="bg-neutral-900 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {pending ? 'Loading...' : mode === 'sign-in' ? 'Sign in' : 'Sign up'}
      </button>
      <button
        type="button"
        onClick={() =>
          setMode((current) => (current === 'sign-in' ? 'sign-up' : 'sign-in'))
        }
        className="text-sm text-neutral-600 hover:text-neutral-900"
      >
        {mode === 'sign-in'
          ? 'Need an account? Sign up'
          : 'Already have an account? Sign in'}
      </button>
    </form>
  )
}
