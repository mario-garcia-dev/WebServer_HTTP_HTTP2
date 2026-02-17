import { Request, Response } from "express";
import { prisma } from "../../data/postgres/db";
import { CreateTodoDTO, UpdateTodoDTO } from "../../domain/dtos/todos";

export class TodosController {
    constructor() {}

    //* CRUD

    // READ
    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: `ID is not a number.` });
        }

        const todo = await prisma.todo.findFirst({
            where: { id },
        });

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id ${id} not found.` });
    };

    // CREATE
    public createTodo = async (req: Request, res: Response) => {
        const [ error, createTodoDTO ] = CreateTodoDTO.create(req.body || {});

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
            data: createTodoDTO!
        });

        res.json(todo);
    };

    // UPDATE
    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDTO.create({...req.body, id});

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.findFirst({
            where: { id },
        });
        if (!todo) {
            return res
                .status(404)
                .json({ error: `TODO with id ${id} not found.` });
        }

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values,
        });

        res.json(updatedTodo);
    };

    // DELETE
    public deteleTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ error: `ID is not a number.` });
        }

        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        if (!todo) {
            return res
                .status(404)
                .json({ error: `TODO with id ${id} not found.` });
        }

        const deleted = await prisma.todo.delete({
            where: { id }
        });
        if (!deleted) {
            return res
                .status(404)
                .json({ error: `TODO with id ${id} not found.` });
        }

        res.json(deleted);
    };
}
