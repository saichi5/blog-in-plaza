import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  3
) // 3-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
  ): Promise<JSON | null> {

    try {
      const res = await fetch(input, init)

      const json = await res.json()
    
      if (!res.ok) {
        if (json.error) {
          const error = new Error(json.error) as Error & {
            status: number
          }
          error.status = res.status
          throw error
        } else {
          throw new Error('An unexpected error occurred')
        }
      }
    
      return json
      
    } catch(error) {
      console.error('error: ', error)
      return null
    }
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}
