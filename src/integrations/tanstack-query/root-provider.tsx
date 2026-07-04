import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import type { ReactNode } from 'react'

export function getContext() {
  return {
    queryClient: new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 30_000,
        },
      },
    }),
  }
}

export default function TanstackQueryProvider({
  children,
}: {
  children: ReactNode
}) {
  const { queryClient } = useRouteContext({ from: '__root__' })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
