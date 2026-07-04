import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { todosQueryOptions } from '#/lib/queries/todos'
import { createTodo, deleteTodo } from '#/server/todos'

export function TodoList() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const { data: todos, isPending, isError } = useQuery(todosQueryOptions())

  const addTodo = useMutation({
    mutationFn: (nextTitle: string) =>
      createTodo({ data: { title: nextTitle } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryOptions().queryKey })
      setTitle('')
    },
  })

  const removeTodo = useMutation({
    mutationFn: (id: number) => deleteTodo({ data: { id } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todosQueryOptions().queryKey })
    },
  })

  return (
    <section className="flex flex-col gap-4 max-w-lg">
      <form
        onSubmit={(event) => {
          event.preventDefault()
          if (!title.trim()) return
          addTodo.mutate(title.trim())
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          placeholder="New todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 border border-neutral-300 px-3 py-2 rounded-md"
        />
        <button
          type="submit"
          disabled={addTodo.isPending}
          className="bg-neutral-900 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {isPending && <p className="text-neutral-500">Loading todos...</p>}
      {isError && <p className="text-red-600">Failed to load todos.</p>}

      <ul className="flex flex-col gap-2">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border border-neutral-200 px-3 py-2 rounded-md"
          >
            <span>{todo.title}</span>
            <button
              type="button"
              onClick={() => removeTodo.mutate(todo.id)}
              disabled={removeTodo.isPending}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
