import { Request, Response } from "express";

const todos = [
    { id: 1, text: "Comprar leche", completedAt: new Date() },
    { id: 2, text: "Pintar toda la casa", completedAt: null },
    { id: 3, text: "Maldecir al estado de Israel", completedAt: new Date() },
    { id: 4, text: "Negros de mierda", completedAt: new Date() },
]

export class TodosController {
    constructor(){}

    //* CRUD

    // READ
    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) { 
            return res.status(400).json({error: `ID is not a number.`});
        }

        const todo = todos.find((t) => t.id === id);
        (todo)
            ? res.json(todo)
            : res.status(404).json({error: `TODO with id ${id} not found.`});
    };

    // CREATE
    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        if (!text) {
            return res.status(400).json({error: `Text property is required.`});
        }

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null,
        };
        todos.push(newTodo);

        res.json(newTodo);
    };

    // UPDATE
    public updateTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if (isNaN(id)) { 
            return res.status(400).json({error: `ID is not a number.`});
        }

        const todo = todos.find((t) => t.id === id);
        if (!todo) {
            return res.status(404).json({error: `TODO with id ${id} not found.`});
        }

        const { text, completedAt } = req.body;
        todo.text = text || todo.text;
        (completedAt === "null")
            ? todo.completedAt = null
            : todo.completedAt = new Date(completedAt || todo.completedAt);

        res.json(todo);
    };

    // DELETE
    public deteleTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) { 
            return res.status(400).json({error: `ID is not a number.`});
        }

        const todo = todos.find((t) => t.id === id);
        if (!todo) {
            return res.status(404).json({error: `TODO with id ${id} not found.`});
        }

        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
    }
};