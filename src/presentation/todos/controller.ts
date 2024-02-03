import { Request, Response } from "express"

const todos = [
  { id: 1, text: 'Buy Eggs', createdAt: new Date() },
  { id: 2, text: 'Buy Almond Milk', createdAt: new Date() },
  { id: 3, text: 'Buy Bread', createdAt: new Date() },
]

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos)
  }

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id

    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find(todo => todo.id === id)

    if (todo) {
      return res.json(todo)
    }

    return res.status(404).json({ error: `Todo with id ${id} not found` })
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body

    if (!text) return res.status(400).json({ error: 'Text property is required' })

    const newTodo = {
      id: todos.length + 1,
      text,
      createdAt: new Date()
    }

    todos.push(newTodo)
    res.status(201).json(newTodo)
  }
  
  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find(todo => todo.id === id)

    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    const { text } = req.body
    if (!text) return res.status(400).json({ error: 'Text property is required' })

    todo.text = text || todo.text
    res.json(todo)
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id)) return res.status(400).json({ error: 'ID argument is not a number' })

    const todo = todos.find(todo => todo.id === id)

    if (!todo) {
      return res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    todos.splice(todos.indexOf(todo), 1)    
    res.json(todo)
  }
}