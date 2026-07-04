import { createFileRoute } from '@tanstack/react-router'
import { AuthForm } from '#/components/auth-form'
import { TodoList } from '#/components/todo-list'
import { authClient } from '#/lib/auth-client'
import { todosQueryOptions } from '#/lib/queries/todos'

export const Route = createFileRoute('/')({
  loader: ({ context }) =>
    context.queryClient.ensureQueryData(todosQueryOptions()),
  component: Home,
})

function Home() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <div className="p-8 flex flex-col gap-10">
      <section>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-2 text-neutral-600">
          TanStack Start with Better Auth, Drizzle, and TanStack Query.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Auth</h2>
        {isPending ? (
          <p className="text-neutral-500">Checking session...</p>
        ) : session?.user ? (
          <p className="text-neutral-600">
            Signed in as {session.user.email}
          </p>
        ) : (
          <AuthForm />
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Todos</h2>
        <TodoList />
      </section>
    </div>
  )
}
