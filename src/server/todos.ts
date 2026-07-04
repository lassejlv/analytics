import { desc } from 'drizzle-orm'
import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import * as v from 'valibot'
import { db } from '#/db'
import { todos } from '#/db/schema'

export const getTodos = createServerFn({ method: 'GET' }).handler(async () => {
  return db.select().from(todos).orderBy(desc(todos.createdAt))
})

const createTodoSchema = v.object({
  title: v.pipe(v.string(), v.minLength(1)),
})

export const createTodo = createServerFn({ method: 'POST' })
  .validator((data: v.InferInput<typeof createTodoSchema>) =>
    v.parse(createTodoSchema, data),
  )
  .handler(async ({ data }) => {
    const [todo] = await db.insert(todos).values({ title: data.title }).returning()
    return todo
  })

const deleteTodoSchema = v.object({
  id: v.number(),
})

export const deleteTodo = createServerFn({ method: 'POST' })
  .validator((data: v.InferInput<typeof deleteTodoSchema>) =>
    v.parse(deleteTodoSchema, data),
  )
  .handler(async ({ data }) => {
    await db.delete(todos).where(eq(todos.id, data.id))
  })
