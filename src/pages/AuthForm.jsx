import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { WatchImage } from '../components/ui/WatchImage'
import { useAuth } from '../context/AuthContext'

const inputClass = (invalid) =>
  `w-full border bg-panel px-4 py-3 text-sm text-cream outline-none focus:border-gold ${
    invalid ? 'border-rose' : 'border-line'
  }`

function PasswordField({ label, value, onChange, visible, onToggle, error, autoComplete }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-gold">{label}</span>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`${inputClass(Boolean(error))} pr-16`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute inset-y-0 right-3 text-[10px] uppercase tracking-[0.18em] text-gold"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error && <span className="mt-1 block text-xs text-rose">{error}</span>}
    </label>
  )
}

export function AuthForm({ mode }) {
  const isLogin = mode === 'login'
  const { login, signup } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/'
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: '' }))
    setServerError('')
  }

  const validate = () => {
    const next = {}
    if (!isLogin && form.name.trim().length < 2) next.name = 'Please enter your full name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = 'Enter a valid email'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters'
    if (!isLogin && form.password !== form.confirm) next.confirm = 'Passwords do not match'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setServerError('')
    if (!validate()) return
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    }
    const result = isLogin ? login(payload) : signup(payload)
    if (!result.ok) {
      setServerError(result.error)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="grid min-h-[calc(100svh-4rem)] w-full lg:grid-cols-2">
      <div className="relative hidden min-h-[280px] overflow-hidden lg:block">
        <WatchImage
          src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?fm=jpg&fit=crop&w=1400&q=80"
          alt="Aureum salon"
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
          loading="eager"
        />
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute bottom-12 left-10 right-10">
          <p className="font-display tracking-[0.4em] text-gold">AUREUM</p>
          <p className="mt-4 font-serif text-4xl italic text-cream">A private door to the maison.</p>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 py-16 sm:px-8 md:px-10">
        <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold">
            {isLogin ? 'Welcome back' : 'Join the salon'}
          </p>
          <h1 className="mt-3 font-serif text-4xl italic text-cream sm:text-5xl">
            {isLogin ? 'Salon login' : 'Create account'}
          </h1>
          <p className="mt-3 text-sm text-muted">
            {isLogin ? (
              <>Enter your details below, or create an account if you are new.</>
            ) : (
              <>
                Already a patron?{' '}
                <Link to="/login" state={{ from }} className="text-gold hover:text-gold-soft">
                  Sign in
                </Link>
              </>
            )}
          </p>

          <div className="mt-8 space-y-4">
            {!isLogin && (
              <label className="block">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-gold">Full name</span>
                <input
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  autoComplete="name"
                  className={inputClass(Boolean(errors.name))}
                />
                {errors.name && <span className="mt-1 block text-xs text-rose">{errors.name}</span>}
              </label>
            )}
            <label className="block">
              <span className="mb-2 block text-[11px] uppercase tracking-[0.24em] text-gold">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => update('email', event.target.value)}
                autoComplete="email"
                className={inputClass(Boolean(errors.email))}
              />
              {errors.email && <span className="mt-1 block text-xs text-rose">{errors.email}</span>}
            </label>
            <PasswordField
              label="Password"
              value={form.password}
              onChange={(event) => update('password', event.target.value)}
              visible={showPassword}
              onToggle={() => setShowPassword((value) => !value)}
              error={errors.password}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />
            {!isLogin && (
              <PasswordField
                label="Confirm password"
                value={form.confirm}
                onChange={(event) => update('confirm', event.target.value)}
                visible={showConfirm}
                onToggle={() => setShowConfirm((value) => !value)}
                error={errors.confirm}
                autoComplete="new-password"
              />
            )}
          </div>

          {serverError && <p className="mt-4 text-sm text-rose">{serverError}</p>}

          <div className="mt-8">
            <Button type="submit" className="w-full">
              {isLogin ? 'Enter the salon' : 'Create account'}
            </Button>
          </div>

          {isLogin && (
            <div className="mt-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-line" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-muted">New here?</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <Button to="/signup" state={{ from }} variant="outline" className="w-full">
                Create account
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export function Login() {
  return <AuthForm mode="login" />
}

export function Signup() {
  return <AuthForm mode="signup" />
}
