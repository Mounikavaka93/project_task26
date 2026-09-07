export function Container({ children, className = '' }) {
  return <div className={`w-full min-w-0 px-4 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}
