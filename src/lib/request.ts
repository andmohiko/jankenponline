export const request = (path: string, options?: RequestInit) => {
  const baseUrl = '/api'
  const commonOption: RequestInit = {
    credentials: 'include',
  }
  return fetch(`${baseUrl}${path}`, { ...commonOption, ...options })
}
